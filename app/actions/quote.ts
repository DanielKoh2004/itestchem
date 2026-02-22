"use server";

import { z } from "zod";
import nodemailer from "nodemailer";

const escapeHtml = (unsafe: string) => unsafe.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#039;");
const sanitizeCsv = (unsafe: string) => {
    let sanitized = unsafe.replace(/"/g, '""');
    if (/^[=+\-@\t\r]/.test(sanitized)) sanitized = "'" + sanitized;
    return sanitized;
};

const testItemSchema = z.object({
    sampleType: z.string().min(1),
    testNames: z.array(z.string()).min(1),
    otherSpecification: z.string().optional(),
    quantity: z.number().min(1),
});

const sampleGroupSchema = z.object({
    category: z.string().min(1),
    tests: z.array(testItemSchema).min(1),
});

const quoteSchema = z.object({
    fullName: z.string().min(2),
    companyName: z.string().min(2),
    email: z.string().email(),
    phoneCode: z.string().min(1),
    phoneNumber: z.string().min(5),
    sampleGroups: z.array(sampleGroupSchema).min(1),
});

export async function submitQuoteRequest(data: any, turnstileToken: string) {
    try {
        // 1. Verify Cloudflare Turnstile Token
        const verifyRes = await fetch(
            "https://challenges.cloudflare.com/turnstile/v0/siteverify",
            {
                method: "POST",
                headers: { "Content-Type": "application/x-www-form-urlencoded" },
                body: `secret=${process.env.TURNSTILE_SECRET_KEY}&response=${turnstileToken}`,
            }
        );

        const verifyData = await verifyRes.json();
        if (!verifyData.success) {
            return { error: "CAPTCHA verification failed. Please try again." };
        }

        // 2. Validate form data with Zod
        const parsedData = quoteSchema.parse(data);

        // 3. Flatten the nested data architecture into standard rows
        // We do this to cleanly iterate over the data for both HTML and CSV generation
        const flatTests: {
            category: string;
            sampleType: string;
            testName: string;
            quantity: number;
        }[] = [];

        for (const group of parsedData.sampleGroups) {
            for (const test of group.tests) {
                // Determine the correct parameter name (incorporating the custom specification if applicable)
                for (const tName of test.testNames) {
                    let finalTestName = tName;
                    if (tName.toLowerCase().includes("other analysis") && test.otherSpecification) {
                        finalTestName = `${tName} (${test.otherSpecification})`;
                    }

                    flatTests.push({
                        category: group.category,
                        sampleType: test.sampleType,
                        testName: finalTestName,
                        quantity: test.quantity,
                    });
                }
            }
        }

        // 4. Configure Nodemailer
        const transporter = nodemailer.createTransport({
            host: process.env.SMTP_HOST || "smtp.gmail.com",
            port: parseInt(process.env.SMTP_PORT || "465", 10),
            secure: true,
            auth: {
                user: process.env.SMTP_EMAIL,
                pass: process.env.SMTP_PASSWORD,
            },
        });

        // 5. Generate dynamic table rows from the flattened array
        const testRowsHtml = flatTests
            .map(
                (test) => `
                <tr>
                    <td style="padding: 10px; border: 1px solid #1E293B;">${escapeHtml(test.category)}</td>
                    <td style="padding: 10px; border: 1px solid #1E293B;">${escapeHtml(test.sampleType)}</td>
                    <td style="padding: 10px; border: 1px solid #1E293B;"><strong>${escapeHtml(test.testName)}</strong></td>
                    <td style="padding: 10px; border: 1px solid #1E293B; text-align: center;">${test.quantity}</td>
                    <td style="padding: 10px; border: 1px solid #1E293B; text-align: center;"></td>
                    <td style="padding: 10px; border: 1px solid #1E293B; text-align: center;"></td>
                </tr>
            `
            )
            .join("");

        // Construct HTML email content
        const htmlContent = `
            <div style="font-family: Arial, sans-serif; color: #334155; line-height: 1.6;">
                <h2 style="color: #0d382d; border-bottom: 2px solid #10b981; padding-bottom: 5px;">New Quote Request</h2>
                
                <p><strong>Client Details:</strong></p>
                <ul style="list-style-type: none; padding-left: 0;">
                    <li><strong>Name:</strong> ${escapeHtml(parsedData.fullName)}</li>
                    <li><strong>Company:</strong> ${escapeHtml(parsedData.companyName)}</li>
                    <li><strong>Email:</strong> ${escapeHtml(parsedData.email)}</li>
                    <li><strong>Phone Number:</strong> ${escapeHtml(parsedData.phoneCode)} ${escapeHtml(parsedData.phoneNumber)}</li>
                </ul>

                <h3 style="color: #0d382d; margin-top: 25px;">Requested Analytical Parameters:</h3>
                
                <table style="width: 100%; border-collapse: collapse; margin-top: 10px; font-size: 14px;">
                    <thead style="background-color: #0f172a; color: #ffffff;">
                        <tr>
                            <th style="padding: 12px 10px; text-align: left; border: 1px solid #1E293B;">Category</th>
                            <th style="padding: 12px 10px; text-align: left; border: 1px solid #1E293B;">Sample Type</th>
                            <th style="padding: 12px 10px; text-align: left; border: 1px solid #1E293B;">Test / Parameter</th>
                            <th style="padding: 12px 10px; text-align: center; border: 1px solid #1E293B;">Quantity</th>
                            <th style="padding: 12px 10px; text-align: center; border: 1px solid #1E293B; width: 100px;">Unit Price (RM)</th>
                            <th style="padding: 12px 10px; text-align: center; border: 1px solid #1E293B; width: 100px;">Total (RM)</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${testRowsHtml}
                    </tbody>
                </table>
                <br />
                <p style="font-size: 12px; color: #64748b; font-style: italic;">
                    Please fill out the blank Unit Price and Total fields prior to forwarding the final quotation to the client. An attached CSV file is provided below for immediate injection into accounting software.
                </p>
            </div>
        `;

        // 6. Generate CSV attachment
        const csvHeader = "Category,Sample Type,Parameter / Test Name,Quantity,Unit Price (RM),Total Price (RM)\n";
        const csvRows = flatTests
            .map((test) => `"${sanitizeCsv(test.category)}","${sanitizeCsv(test.sampleType)}","${sanitizeCsv(test.testName)}","${test.quantity}","",""`)
            .join("\n");
        const csvContent = csvHeader + csvRows;
        const csvBuffer = Buffer.from(csvContent, "utf-8");

        // 7. Send Email configuration
        await transporter.sendMail({
            from: `"iTestchem Submissions" <${process.env.SMTP_EMAIL}>`,
            to: process.env.RECEIVER_EMAIL, // Commercial staff email address
            subject: `[Quote Request] - ${parsedData.companyName.toUpperCase()}`,
            html: htmlContent,
            replyTo: parsedData.email,
            attachments: [
                {
                    filename: `${parsedData.companyName.replace(/[^a-zA-Z0-9]/g, '_')}_QuoteData.csv`,
                    content: csvBuffer,
                    contentType: "text/csv",
                },
            ],
        });

        return { success: true };
    } catch (error: any) {
        console.error("Quote validation error:", error);
        return {
            error: "An unexpected error occurred while submitting your request. Please try again.",
        };
    }
}
