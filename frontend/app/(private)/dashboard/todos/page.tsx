"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import {
    Plus,
    Search,
    Pencil,
    Trash2,
    CalendarDays,
    ListTodo,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
    Card,
    CardContent,
} from "@/components/ui/card";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";

import DeleteTodoDialog from "@/components/delete-todo-dialog";

type Todo = {
    id: number;
    title: string;
    description: string;
    priority: "High" | "Medium" | "Low";
    status: "Pending" | "In Progress" | "Completed";
    date: string;
};

const initialTodos: Todo[] = [
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
    {
        id: 4,
        title: "Implement Redis caching",
        description: "Add caching for frequently accessed data",
        priority: "High",
        status: "Pending",
        date: "Nov 18, 2026",
    },
];

export default function TodosPage() {
    const [todos, setTodos] = useState(initialTodos);
    const [search, setSearch] = useState("");
    const [status, setStatus] = useState("all");
    const [deleteId, setDeleteId] = useState<number | null>(null);

    const filteredTodos = useMemo(() => {
        return todos.filter((todo) => {
            const matchesSearch =
                todo.title.toLowerCase().includes(search.toLowerCase()) ||
                todo.description.toLowerCase().includes(search.toLowerCase());

            const matchesStatus =
                status === "all" || todo.status === status;

            return matchesSearch && matchesStatus;
        });
    }, [todos, search, status]);

    const deleteTodo = () => {
        setTodos((previous) =>
            previous.filter((todo) => todo.id !== deleteId)
        );

        setDeleteId(null);
    };

    const selectedTodo = todos.find((todo) => todo.id === deleteId);

    return (
        <div className="p-8">

            {/* Header */}
            <div className="mb-8 flex flex-wrap items-center justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-bold">My Tasks</h1>
                    <p className="mt-1 text-sm text-slate-500">
                        Manage and organize all your tasks.
                    </p>
                </div>

                <Button className="bg-violet-600 hover:bg-violet-700">
                    <Link href="/dashboard/todos/new">
                        <Plus size={18} className="mr-2" />
                        Add New Task
                    </Link>
                </Button>
            </div>

            {/* Search and Filter */}
            <Card className="mb-6 border-none shadow-sm">
                <CardContent className="flex flex-col gap-4 p-5 sm:flex-row">
                    <div className="relative flex-1">
                        <Search
                            size={18}
                            className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                        />

                        <Input
                            placeholder="Search your tasks..."
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            className="pl-10"
                        />
                    </div>

                    <Select value={status} onValueChange={setStatus}>
                        <SelectTrigger className="w-full sm:w-48">
                            <SelectValue placeholder="Filter status" />
                        </SelectTrigger>

                        <SelectContent>
                            <SelectItem value="all">All Tasks</SelectItem>
                            <SelectItem value="Pending">Pending</SelectItem>
                            <SelectItem value="In Progress">In Progress</SelectItem>
                            <SelectItem value="Completed">Completed</SelectItem>
                        </SelectContent>
                    </Select>
                </CardContent>
            </Card>

            {/* Todo List */}
            <Card className="border-none shadow-sm">
                <CardContent className="p-0">
                    <div className="border-b p-5">
                        <h2 className="font-semibold">
                            All Tasks ({filteredTodos.length})
                        </h2>
                    </div>

                    {filteredTodos.length === 0 ? (
                        <div className="flex flex-col items-center py-16 text-center">
                            <ListTodo size={40} className="mb-3 text-slate-300" />
                            <h3 className="font-semibold">No tasks found</h3>
                            <p className="mt-1 text-sm text-slate-500">
                                Try changing your search or filters.
                            </p>
                        </div>
                    ) : (
                        <div className="divide-y">
                            {filteredTodos.map((todo) => (
                                <div
                                    key={todo.id}
                                    className="flex flex-wrap items-center justify-between gap-4 p-5 transition hover:bg-slate-50"
                                >
                                    <div className="min-w-0 flex-1">
                                        <div className="flex flex-wrap items-center gap-3">
                                            <h3 className="font-semibold">{todo.title}</h3>

                                            <Badge
                                                className={
                                                    todo.priority === "High"
                                                        ? "bg-red-100 text-red-700 hover:bg-red-100"
                                                        : todo.priority === "Medium"
                                                            ? "bg-amber-100 text-amber-700 hover:bg-amber-100"
                                                            : "bg-green-100 text-green-700 hover:bg-green-100"
                                                }
                                            >
                                                {todo.priority}
                                            </Badge>
                                        </div>

                                        <p className="mt-1 text-sm text-slate-500">
                                            {todo.description}
                                        </p>

                                        <div className="mt-3 flex items-center gap-2 text-xs text-slate-400">
                                            <CalendarDays size={14} />
                                            {todo.date}
                                        </div>
                                    </div>

                                    <div className="flex items-center gap-3">
                                        <Badge variant="outline">
                                            {todo.status}
                                        </Badge>

                                        <Button
                                            variant="ghost"
                                            size="icon"
                                            aria-label="Edit task"

                                        >
                                            <Link href={`/dashboard/todos/${todo.id}/edit`}>
                                                <Pencil size={17} />
                                            </Link>
                                        </Button>

                                        <Button
                                            variant="ghost"
                                            size="icon"
                                            aria-label="Delete task"
                                            onClick={() => setDeleteId(todo.id)}
                                            className="text-red-500 hover:bg-red-50 hover:text-red-600"
                                        >
                                            <Trash2 size={17} />
                                        </Button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </CardContent>
            </Card>

            {/* Delete Confirmation */}
            <DeleteTodoDialog
                open={deleteId !== null}
                onOpenChange={(open) => {
                    if (!open) setDeleteId(null);
                }}
                todoTitle={selectedTodo?.title ?? ""}
                onConfirm={deleteTodo}
            />

        </div>
    );
}