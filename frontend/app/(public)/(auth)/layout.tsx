import { defaultMetadata } from "@/lib/seo";
import type { Metadata } from "next";
import { ReactNode } from "react";
export const metadata: Metadata = defaultMetadata;
export default function AuthLayout({ children }: { children: ReactNode }) {
    return (
        <>
            <html lang="en">
                <body>
                    <div className="flex min-h-[80vh] items-center justify-center px-4 py-12">
                        <div className="w-full max-w-300">
                            {children}
                        </div>
                    </div>
                </body>
            </html>
        </>
    )
}