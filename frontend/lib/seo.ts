
import type { Metadata } from "next";

const siteConfig = {
    name: "TaskFlow",
    description: "Organize your tasks, manage your time, and become more productive with TaskFlow.",
    url: process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000",
};

export function createMetadata({ title, description = siteConfig.description, path = "", }: { title: string; description?: string; path?: string; }): Metadata {
    return {
        title,
        description,
        metadataBase: new URL(siteConfig.url),
        alternates: {
            canonical: path,
        },
        openGraph: {
            title: `${title} | ${siteConfig.name}`,
            description,
            siteName: siteConfig.name,
            url: path,
            type: "website",
        },
    };
}

export const defaultMetadata: Metadata = {
    metadataBase: new URL(siteConfig.url),
    title: {
        default: siteConfig.name,
        template: `%s | ${siteConfig.name}`,
    },
    description: siteConfig.description,
    applicationName: siteConfig.name,
};
