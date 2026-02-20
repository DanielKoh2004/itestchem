import type { Metadata } from "next";
import { Noto_Sans } from "next/font/google";
import "./globals.css";

const notoSans = Noto_Sans({
  variable: "--font-noto-sans",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800", "900"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "i-TESTCHEM Laboratory Services | Accredited Agricultural & Environmental Testing",
  description:
    "i-TESTCHEM provides SAMM-accredited MS ISO/IEC 17025 agricultural, environmental, and chemical analysis laboratory services in Sarawak, Malaysia since 2013.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${notoSans.variable} bg-background-legacy text-slate-900 font-body antialiased flex flex-col min-h-screen`}
        style={{ fontFamily: "var(--font-noto-sans), Noto Sans, sans-serif" }}
      >
        {children}
      </body>
    </html>
  );
}
