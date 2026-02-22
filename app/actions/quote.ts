"use server";

import nodemailer from "nodemailer";
import { z } from "zod";

const quoteItemSchema = z.object({
    category: z.string().min(1, "Category is required"),
    testNames: z.array(z.string()).min(1, "Please select at least one test parameter"),
    quantity: z.number().min(1, "At least 1 sample is required"),
});

const quoteSchema = z.object({
    fullName: z.string().min(2, "Full name must be at least 2 characters"),
    companyName: z.string().min(2, "Company name must be at least 2 characters"),
    email: z.string().email("Please enter a valid email address"),
    phoneCode: z.string().min(1, "Country code is required"),
    phoneNumber: z.string().min(5, "Phone number is required"),
    tests: z.array(quoteItemSchema).min(1, "At least one analysis category must be added"),
});

// We accept `any` for payload to parse it securely with Zod inside the server execution boundary
export async function submitQuoteRequest(payload: any, turnstileToken: string) {
    if (!turnstileToken) {
        return { error: "CAPTCHA token missing." };
    }

    try {
        // Security Layer 1: Cloudflare Turnstile
        const turnstileResponse = await fetch("https://challenges.cloudflare.com/turnstile/v0/siteverify", {
            method: "POST",
            headers: {
                "Content-Type": "application/x-www-form-urlencoded",
            },
            body: `secret=${process.env.TURNSTILE_SECRET_KEY}&response=${turnstileToken}`,
        });

        const turnstileData = await turnstileResponse.json();

        if (!turnstileData.success) {
            return { error: "Bot detected. CAPTCHA validation failed." };
        }

        // Security Layer 2: Zod Server Validation
        const validatedFields = quoteSchema.safeParse(payload);

        if (!validatedFields.success) {
            return { error: "Invalid form data structure. Please check your inputs." };
        }

        const data = validatedFields.data;
        const fullPhoneNumber = `${data.phoneCode} ${data.phoneNumber}`;

        // Flatten the tests array so each selected multi-select test gets its own distinct row for pricing
        interface FlatTest {
            category: string;
            testName: string;
            quantity: number;
        }

        const flatTests: FlatTest[] = [];
        data.tests.forEach((group) => {
            group.testNames.forEach((name) => {
                flatTests.push({
                    category: group.category,
                    testName: name,
                    quantity: group.quantity
                });
            });
        });

        // Generate HTML rows for the requested tests with empty brackets for fast typing
        const testRowsHtml = flatTests.map((test, index) => `
            <tr>
                <td style="padding: 10px; border: 1px solid #ddd; text-align: center;">${index + 1}</td>
                <td style="padding: 10px; border: 1px solid #ddd;">${test.category}</td>
                <td style="padding: 10px; border: 1px solid #ddd;">${test.testName}</td>
                <td style="padding: 10px; border: 1px solid #ddd; text-align: center;">${test.quantity}</td>
                <td style="padding: 10px; border: 1px solid #ddd; text-align: center; color: #64748b; font-family: monospace;">[ &nbsp; &nbsp; &nbsp; &nbsp; ]</td>
                <td style="padding: 10px; border: 1px solid #ddd; text-align: center; color: #64748b; font-family: monospace;">[ &nbsp; &nbsp; &nbsp; &nbsp; ]</td>
            </tr>
        `).join('');

        // CSV Generation
        const csvHeaders = "Category,Parameter / Test Name,No. of Samples,Unit Price (RM),Total Price (RM)\n";
        // Escape strings that might have commas (e.g., "Trace Elements (Cu, Zn, Fe, Mn)")
        const escapeCSV = (str: string) => `"${str.replace(/"/g, '""')}"`;
        const csvRows = flatTests.map(test =>
            `${escapeCSV(test.category)},${escapeCSV(test.testName)},${test.quantity},,`
        ).join("\n");
        const csvString = csvHeaders + csvRows;

        // Convert to Node Buffer for attaching
        const csvBuffer = Buffer.from(csvString, 'utf-8');

        // Clean company name for the dynamic CSV filename
        const safeCompanyName = data.companyName.replace(/[^a-zA-Z0-9_-]/g, '_');
        const csvFilename = `Quote_Request_${safeCompanyName}.csv`;

        // Execution Layer: Nodemailer
        const transporter = nodemailer.createTransport({
            host: "smtp.gmail.com",
            port: 465, // SSL
            secure: true,
            auth: {
                user: process.env.SMTP_EMAIL,
                pass: process.env.SMTP_PASSWORD,
            },
        });

        const mailOptions = {
            from: process.env.SMTP_EMAIL,
            to: process.env.RECEIVER_EMAIL,
            replyTo: data.email, // Allows one-click replying to the customer to send the quote back
            subject: `[Quote Request] ${data.companyName} - ${data.fullName}`,
            html: `
                <div style="font-family: Arial, sans-serif; color: #333; max-width: 900px; margin: 0 auto;">
                    <h2 style="color: #064E3B; border-bottom: 2px solid #059669; padding-bottom: 10px;">New Quote Request</h2>
                    
                    <table style="border-collapse: collapse; width: 100%; margin-bottom: 30px;">
                        <tr>
                            <td style="padding: 10px; border: 1px solid #ddd; font-weight: bold; width: 30%; background-color: #f8fafc;">Client Name</td>
                            <td style="padding: 10px; border: 1px solid #ddd;">${data.fullName}</td>
                        </tr>
                        <tr>
                            <td style="padding: 10px; border: 1px solid #ddd; font-weight: bold; background-color: #f8fafc;">Company Name</td>
                            <td style="padding: 10px; border: 1px solid #ddd;">${data.companyName}</td>
                        </tr>
                        <tr>
                            <td style="padding: 10px; border: 1px solid #ddd; font-weight: bold; background-color: #f8fafc;">Email Address</td>
                            <td style="padding: 10px; border: 1px solid #ddd;"><a href="mailto:${data.email}">${data.email}</a></td>
                        </tr>
                        <tr>
                            <td style="padding: 10px; border: 1px solid #ddd; font-weight: bold; background-color: #f8fafc;">Phone Number</td>
                            <td style="padding: 10px; border: 1px solid #ddd;">${fullPhoneNumber}</td>
                        </tr>
                    </table>

                    <h3 style="color: #064E3B; margin-top: 30px; margin-bottom: 5px;">Requested Analysis Parameters</h3>
                    <p style="font-size: 13px; color: #64748b; margin-top: 0; margin-bottom: 15px;">
                        <em>Hit 'Reply' and type prices directly into the brackets below, or use the attached CSV framework.</em>
                    </p>
                    <table style="border-collapse: collapse; width: 100%;">
                        <thead>
                            <tr style="background-color: #1a365d; color: white;">
                                <th style="padding: 12px 10px; border: 1px solid #ddd; width: 5%;">#</th>
                                <th style="padding: 12px 10px; border: 1px solid #ddd; width: 20%; text-align: left;">Category</th>
                                <th style="padding: 12px 10px; border: 1px solid #ddd; width: 35%; text-align: left;">Test / Parameter Name</th>
                                <th style="padding: 12px 10px; border: 1px solid #ddd; width: 10%;">Samples</th>
                                <th style="padding: 12px 10px; border: 1px solid #ddd; width: 15%;">Unit Price (RM)</th>
                                <th style="padding: 12px 10px; border: 1px solid #ddd; width: 15%;">Total Price (RM)</th>
                            </tr>
                        </thead>
                        <tbody>
                            ${testRowsHtml}
                        </tbody>
                    </table>
                    
                    <p style="margin-top: 30px; font-size: 12px; color: #64748b;">
                        This quote request was submitted securely via the iTestchem web portal.
                    </p>
                </div>
            `,
            attachments: [
                {
                    filename: csvFilename,
                    content: csvBuffer,
                    contentType: "text/csv"
                }
            ]
        };

        await transporter.sendMail(mailOptions);

        return { success: true };
    } catch (error) {
        console.error("Quote submission error:", error);
        return { error: "Failed to submit quote request. Please try again later." };
    }
}
