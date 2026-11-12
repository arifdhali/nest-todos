"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
    LayoutDashboard,
    CheckSquare,
    Plus,
    Settings,
    LogOut,
    CheckCircle2,
} from "lucide-react";

const menuItems = [
    {
        title: "Dashboard",
        href: "/dashboard",
        icon: LayoutDashboard,
    },
    {
        title: "My Tasks",
        href: "/dashboard/todos",
        icon: CheckSquare,
    },
    {
        title: "Add Task",
        href: "/dashboard/todos/new",
        icon: Plus,
    },
];

export default function Sidebar() {
    const pathname = usePathname();

    return (
        <aside className="fixed left-0 top-0 z-40 flex h-screen w-64 flex-col border-r bg-white px-5 py-6">

            {/* Logo */}
            <Link href="/dashboard" className="mb-10 flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-violet-600 text-white">
                    <CheckCircle2 size={22} />
                </div>

                <span className="text-xl font-bold tracking-tight">
                    TaskFlow
                </span>
            </Link>

            {/* Navigation */}
            <div className="mb-3 text-xs font-semibold uppercase tracking-wider text-slate-400">
                Workspace
            </div>

            <nav className="space-y-2">
                {menuItems.map((item) => {
                    const Icon = item.icon;

                    const active =
                        pathname === item.href ||
                        (item.href === "/dashboard/todos" &&
                            pathname.startsWith("/dashboard/todos"));

                    return (
                        <Link
                            key={item.href}
                            href={item.href}
                            className={`flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium transition ${active
                                    ? "bg-violet-50 text-violet-700"
                                    : "text-slate-500 hover:bg-slate-50 hover:text-slate-900"
                                }`}
                        >
                            <Icon size={19} />
                            {item.title}
                        </Link>
                    );
                })}
            </nav>

            {/* Bottom */}
            <div className="mt-auto space-y-2 border-t pt-5">
                <Link
                    href="/dashboard/settings"
                    className="flex items-center gap-3 rounded-xl px-4 py-3 text-sm text-slate-500 hover:bg-slate-50"
                >
                    <Settings size={19} />
                    Settings
                </Link>

                <button className="flex w-full items-center gap-3 rounded-xl px-4 py-3 text-sm text-red-500 hover:bg-red-50">
                    <LogOut size={19} />
                    Logout
                </button>
            </div>
        </aside>
    );
}