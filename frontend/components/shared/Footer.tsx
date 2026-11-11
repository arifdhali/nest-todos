import Link from "next/link";
import { CheckSquare } from "lucide-react";
import CurrentYear from "./currentYear";

export default function Footer() {
    return (
        <footer className="border-t bg-gray-950 text-gray-300">
            <div className="mx-auto max-w-7xl px-6 py-14">
                <div className="grid gap-10 md:grid-cols-4">
                    <div className="space-y-4">
                        <div className="flex items-center gap-2 text-white">
                            <CheckSquare className="text-violet-400" />
                            <span className="text-xl font-bold">TaskFlow</span>
                        </div>

                        <p className="max-w-xs text-sm leading-6 text-gray-400">
                            Organize your tasks, manage your time, and make every day
                            more productive.
                        </p>
                    </div>

                    <div>
                        <h3 className="mb-4 font-semibold text-white">Product</h3>
                        <ul className="space-y-3 text-sm">
                            <li><Link href="/#features">Features</Link></li>
                            <li><Link href="/register">Get Started</Link></li>
                            <li><Link href="/login">Login</Link></li>
                        </ul>
                    </div>

                    <div>
                        <h3 className="mb-4 font-semibold text-white">Resources</h3>
                        <ul className="space-y-3 text-sm">
                            <li><Link href="/blog">Blog</Link></li>
                            <li><Link href="/blog">Productivity Tips</Link></li>
                            <li><Link href="/blog">Guides</Link></li>
                        </ul>
                    </div>

                    <div>
                        <h3 className="mb-4 font-semibold text-white">Company</h3>
                        <ul className="space-y-3 text-sm">
                            <li><Link href="/#about">About Us</Link></li>
                            <li><Link href="/#contact">Contact</Link></li>
                            <li><Link href="/#privacy">Privacy Policy</Link></li>
                        </ul>
                    </div>
                </div>

                <div className="mt-12 border-t border-gray-800 pt-6 text-center text-sm text-gray-500">
                    © <CurrentYear /> TaskFlow. All rights reserved.
                </div>
            </div>
        </footer>
    );
}
