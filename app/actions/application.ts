"use server";

import nodemailer from "nodemailer";

const escapeHtml = (unsafe: string) => unsafe.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#039;");

export async function submitApplication(formData: FormData) {
    const fullName = formData.get("fullName") as string;
    const email = formData.get("email") as string;
    const position = formData.get("position") as string;
    const turnstileToken = formData.get("turnstileToken") as string;
    const resume = formData.get("resume") as File | null;
    const coverLetter = formData.get("coverLetter") as File | null;

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

        // Security Layer 2: Strict File Validation
        if (!resume || typeof resume === "string") {
            return { error: "Resume file is required." };
        }

        if (resume.type !== "application/pdf") {
            return { error: "Only PDF files are allowed for the resume." };
        }

        if (resume.size > 5 * 1024 * 1024) {
            return { error: "Resume file size exceeds the 5MB limit." };
        }

        // Buffer Conversion
        const resumeBuffer = Buffer.from(await resume.arrayBuffer());

        const safeResumeName = resume.name.replace(/[^a-zA-Z0-9.\-_]/g, '_').replace(/\.[^/.]+$/, "") + ".pdf";
        const attachments = [
            {
                filename: safeResumeName,
                content: resumeBuffer,
                contentType: "application/pdf"
            }
        ];

        // Optional Cover Letter
        if (coverLetter && typeof coverLetter !== "string" && coverLetter.size > 0) {
            if (coverLetter.type !== "application/pdf") {
                return { error: "Only PDF files are allowed for the cover letter." };
            }
            if (coverLetter.size > 5 * 1024 * 1024) {
                return { error: "Cover letter file size exceeds the 5MB limit." };
            }
            const coverLetterBuffer = Buffer.from(await coverLetter.arrayBuffer());
            const safeCoverLetterName = coverLetter.name.replace(/[^a-zA-Z0-9.\-_]/g, '_').replace(/\.[^/.]+$/, "") + ".pdf";
            attachments.push({
                filename: safeCoverLetterName,
                content: coverLetterBuffer,
                contentType: "application/pdf"
            });
        }

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

        const mailOptions = {
            from: process.env.SMTP_EMAIL,
            to: process.env.RECEIVER_EMAIL,
            subject: `[Job Application] ${position} - ${fullName}`,
            html: `
                <h2>New Job Application Received</h2>
                <table style="border-collapse: collapse; width: 100%; max-width: 600px;">
                    <tr>
                        <td style="padding: 10px; border: 1px solid #ddd; font-weight: bold;">Full Name</td>
                        <td style="padding: 10px; border: 1px solid #ddd;">${escapeHtml(fullName)}</td>
                    </tr>
                    <tr>
                        <td style="padding: 10px; border: 1px solid #ddd; font-weight: bold;">Email</td>
                        <td style="padding: 10px; border: 1px solid #ddd;">${escapeHtml(email)}</td>
                    </tr>
                    <tr>
                        <td style="padding: 10px; border: 1px solid #ddd; font-weight: bold;">Position Applied</td>
                        <td style="padding: 10px; border: 1px solid #ddd;">${escapeHtml(position)}</td>
                    </tr>
                </table>
            `,
            attachments: attachments
        };

        await transporter.sendMail(mailOptions);

        return { success: true };
    } catch (error) {
        console.error("Application submission error:", error);
        return { error: "Failed to submit application." };
    }
}
