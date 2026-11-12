import Sidebar from "@/components/dashboard/sidebar";
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "@/app/globals.css";
import { ReactNode } from "react";
import { defaultMetadata } from "@/lib/seo";

const geistSans = Geist({
    variable: "--font-geist-sans",
    subsets: ["latin"],
});

const geistMono = Geist_Mono({
    variable: "--font-geist-mono",
    subsets: ["latin"],
});

export const metadata: Metadata = defaultMetadata;

export default function DashboardLayout({ children }: { children: ReactNode }) {
    return (
        <html
            lang="en"
            className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
        >
            <body className="min-h-full flex flex-col">
                <div className="min-h-screen bg-slate-50">
                    <Sidebar />

                    <main className="min-h-screen pl-64">{children}</main>
                </div>
            </body>
        </html>
    );
}


