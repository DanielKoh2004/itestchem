"use server";

import * as z from "zod";
import nodemailer from "nodemailer";

const escapeHtml = (unsafe: string) => unsafe.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#039;");

const contactSchema = z.object({
    fullName: z.string().min(2, "Full name must be at least 2 characters").max(100, "Name too long"),
    companyName: z.string().min(2, "Company name must be at least 2 characters").max(100, "Company name too long"),
    email: z.string().email("Please enter a valid email address").max(150, "Email too long"),
    inquiryType: z.enum([
        "Request a Quote",
        "Technical Support",
        "Sample Tracking",
        "General Inquiry",
    ], { required_error: "Please select an inquiry type", invalid_type_error: "Invalid inquiry type" } as any),
    message: z
        .string()
        .min(10, "Message must be at least 10 characters")
        .max(1000, "Message must not exceed 1000 characters"),
});

export async function submitContactForm(payload: z.infer<typeof contactSchema>, turnstileToken: string) {
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
        const validatedFields = contactSchema.safeParse(payload);

        if (!validatedFields.success) {
            return { error: "Invalid form data structure." };
        }

        const data = validatedFields.data;

        // Execution Layer: Nodemailer
        const transporter = nodemailer.createTransport({
            host: "smtp.gmail.com",
            port: 465,
            secure: true,
            auth: {
                user: process.env.SMTP_EMAIL,
                pass: process.env.SMTP_PASSWORD,
            },
        });

        const safeCompanyName = data.companyName.replace(/[\r\n]/g, '');

        const mailOptions = {
            from: process.env.SMTP_EMAIL,
            to: process.env.RECEIVER_EMAIL,
            subject: `[Web Portal] ${data.inquiryType} from ${safeCompanyName}`,
            replyTo: data.email,
            html: `
                <h2>New Contact Inquiry</h2>
                <table style="border-collapse: collapse; width: 100%; max-width: 600px;">
                    <tr>
                        <td style="padding: 10px; border: 1px solid #ddd; font-weight: bold;">Full Name</td>
                        <td style="padding: 10px; border: 1px solid #ddd;">${escapeHtml(data.fullName)}</td>
                    </tr>
                    <tr>
                        <td style="padding: 10px; border: 1px solid #ddd; font-weight: bold;">Company Name</td>
                        <td style="padding: 10px; border: 1px solid #ddd;">${escapeHtml(data.companyName)}</td>
                    </tr>
                    <tr>
                        <td style="padding: 10px; border: 1px solid #ddd; font-weight: bold;">Work Email</td>
                        <td style="padding: 10px; border: 1px solid #ddd;">${escapeHtml(data.email)}</td>
                    </tr>
                    <tr>
                        <td style="padding: 10px; border: 1px solid #ddd; font-weight: bold;">Inquiry Type</td>
                        <td style="padding: 10px; border: 1px solid #ddd;">${escapeHtml(data.inquiryType)}</td>
                    </tr>
                    <tr>
                        <td style="padding: 10px; border: 1px solid #ddd; font-weight: bold;">Message</td>
                        <td style="padding: 10px; border: 1px solid #ddd; white-space: pre-wrap;">${escapeHtml(data.message)}</td>
                    </tr>
                </table>
            `,
        };

        await transporter.sendMail(mailOptions);

        return { success: true };
    } catch (error) {
        console.error("Email submission error:", error);
        return { error: "Failed to connect to email server." };
    }
}
