
import { CheckSquare } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const navLinks = [
    { label: "Home", href: "/" },
    { label: "Features", href: "/#features" },
    { label: "Blog", href: "/blog" },
];



export default function Header() {
    return (
        <header className="sticky top-0 z-50 border-b bg-white/90 backdrop-blur">
            <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
                <Link href="/" className="flex items-center gap-2">
                    <div className="rounded-lg bg-violet-600 p-2 text-white">
                        <CheckSquare size={20} />
                    </div>
                    <span className="text-xl font-bold tracking-tight">
                        TaskFlow
                    </span>
                </Link>

                <nav className="hidden items-center gap-8 md:flex">
                    {navLinks.map((link) => (
                        <Link
                            key={link.href}
                            href={link.href}
                            className="text-sm font-medium text-gray-600 transition hover:text-violet-600"
                        >
                            {link.label}
                        </Link>
                    ))}
                </nav>

                <div className="flex items-center gap-3">
                    <Button variant="ghost" >
                        <Link href="/login">Login</Link>
                    </Button>
                    <Button>
                        <Link href={"/dashboard"}> Dashboard</Link>
                    </Button>
                    <Button className=" hover:bg-violet-700">
                        <Link href="/register">Get Started</Link>
                    </Button>
                </div>
            </div>
        </header>
    );
}