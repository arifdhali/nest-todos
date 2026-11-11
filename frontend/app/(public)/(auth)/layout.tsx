import { defaultMetadata } from "@/lib/seo";
import type { Metadata } from "next";
import { ReactNode } from "react";
export const metadata: Metadata = defaultMetadata;
export default function AuthLayout({ children }: { children: ReactNode }) {
    return (
        <>
            <html lang="en">
                <body>
                    {children}
                </body>
            </html>
        </>
    )
}