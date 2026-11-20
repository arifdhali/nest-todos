import Link from "next/link";
import {
    CheckCircle2,
    Clock,
    ListTodo,
    Plus,
    ArrowUpRight,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const stats = [
    {
        title: "Total Tasks",
        value: "24",
        description: "All your tasks",
        icon: ListTodo,
    },
    {
        title: "Completed",
        value: "14",
        description: "Tasks completed",
        icon: CheckCircle2,
    },
    {
        title: "Pending",
        value: "08",
        description: "Tasks remaining",
        icon: Clock,
    },
    {
        title: "In Progress",
        value: "02",
        description: "Currently working",
        icon: ArrowUpRight,
    },
];

const recentTodos = [
    {
        id: 1,
        title: "Complete dashboard UI",
        description: "Build the TaskFlow dashboard",
        priority: "High",
        status: "In Progress",
        date: "Nov 15, 2026",
    },
    {
        id: 2,
        title: "Implement authentication",
        description: "Connect login and registration APIs",
        priority: "Medium",
        status: "Pending",
        date: "Nov 16, 2026",
    },
    {
        id: 3,
        title: "Design database schema",
        description: "Create todo and user models",
        priority: "Low",
        status: "Completed",
        date: "Nov 12, 2026",
    },
];

export default function DashboardPage() {
    return (
        <div className="p-8">

            {/* Header */}
            <div className="mb-8 flex flex-wrap items-center justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-slate-900">
                        Dashboard
                    </h1>
                    <p className="mt-1 text-sm text-slate-500">
                        Welcome back! Here's what's happening with your tasks.
                    </p>
                </div>

                <Button className="bg-violet-600 hover:bg-violet-700">
                    <Link href="/dashboard/todos/new">
                        <Plus size={18} className="mr-2" />
                        Create Task
                    </Link>
                </Button>
            </div>

            {/* Statistics */}
            <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
                {stats.map((stat) => {
                    const Icon = stat.icon;

                    return (
                        <Card key={stat.title} className="border-none shadow-sm">
                            <CardContent className="flex items-center justify-between p-6">
                                <div>
                                    <p className="text-sm text-slate-500">
                                        {stat.title}
                                    </p>

                                    <h2 className="mt-2 text-3xl font-bold">
                                        {stat.value}
                                    </h2>

                                    <p className="mt-1 text-xs text-slate-400">
                                        {stat.description}
                                    </p>
                                </div>

                                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-violet-50 text-violet-600">
                                    <Icon size={23} />
                                </div>
                            </CardContent>
                        </Card>
                    );
                })}
            </div>

            {/* Progress */}
            <Card className="mt-7 border-none shadow-sm">
                <CardContent className="p-6">
                    <div className="mb-4 flex items-center justify-between">
                        <div>
                            <h2 className="font-semibold">Overall Progress</h2>
                            <p className="mt-1 text-sm text-slate-500">
                                Your task completion rate
                            </p>
                        </div>

                        <span className="text-xl font-bold text-violet-600">
                            58%
                        </span>
                    </div>

                    <div className="h-3 overflow-hidden rounded-full bg-slate-100">
                        <div className="h-full w-[58%] rounded-full bg-violet-600" />
                    </div>
                </CardContent>
            </Card>

            {/* Recent Tasks */}
            <Card className="mt-7 border-none shadow-sm">
                <CardContent className="p-6">
                    <div className="mb-6 flex items-center justify-between">
                        <div>
                            <h2 className="text-lg font-semibold">Recent Tasks</h2>
                            <p className="text-sm text-slate-500">
                                Your latest activities
                            </p>
                        </div>

                        <Button variant="outline" >
                            <Link href="/dashboard/todos">
                                View all
                            </Link>
                        </Button>
                    </div>

                    <div className="space-y-4">
                        {recentTodos.map((todo) => (
                            <div
                                key={todo.id}
                                className="flex flex-wrap items-center justify-between gap-4 rounded-xl border p-4"
                            >
                                <div>
                                    <h3 className="font-medium">{todo.title}</h3>
                                    <p className="mt-1 text-sm text-slate-500">
                                        {todo.description}
                                    </p>
                                </div>

                                <div className="flex items-center gap-3">
                                    <Badge variant="outline">{todo.priority}</Badge>

                                    <Badge
                                        className={
                                            todo.status === "Completed"
                                                ? "bg-green-100 text-green-700 hover:bg-green-100"
                                                : todo.status === "In Progress"
                                                    ? "bg-blue-100 text-blue-700 hover:bg-blue-100"
                                                    : "bg-amber-100 text-amber-700 hover:bg-amber-100"
                                        }
                                    >
                                        {todo.status}
                                    </Badge>
                                </div>
                            </div>
                        ))}
                    </div>
                </CardContent>
            </Card>

        </div>
    );
}