"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowLeft, CalendarDays } from "lucide-react";
import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";

import { Card, CardContent } from "@/components/ui/card";

export default function AddTodoPage() {
    const router = useRouter();

    const [formData, setFormData] = useState({
        title: "",
        description: "",
        priority: "Medium",
        status: "Pending",
        dueDate: "",
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        console.log("New Todo:", formData);

        // Connect your API here.
        router.push("/dashboard/todos");
    };

    return (
        <div className="p-8">

            {/* Header */}
            <div className="mb-8">
                <Button variant="ghost" className="mb-4 -ml-3">
                    <Link href="/dashboard/todos">
                        <ArrowLeft size={18} className="mr-2" />
                        Back to Tasks
                    </Link>
                </Button>

                <h1 className="text-2xl font-bold">Create New Task</h1>

                <p className="mt-1 text-sm text-slate-500">
                    Add a new task and keep your work organized.
                </p>
            </div>

            {/* Form */}
            <Card className="max-w-3xl border-none shadow-sm">
                <CardContent className="p-6 sm:p-8">
                    <form onSubmit={handleSubmit} className="space-y-6">

                        {/* Title */}
                        <div className="space-y-2">
                            <Label htmlFor="title">Task Title *</Label>

                            <Input
                                id="title"
                                placeholder="e.g. Complete dashboard UI"
                                value={formData.title}
                                onChange={(e) =>
                                    setFormData({
                                        ...formData,
                                        title: e.target.value,
                                    })
                                }
                                required
                            />
                        </div>

                        {/* Description */}
                        <div className="space-y-2">
                            <Label htmlFor="description">Description</Label>

                            <Textarea
                                id="description"
                                placeholder="Describe what needs to be done..."
                                rows={5}
                                value={formData.description}
                                onChange={(e) =>
                                    setFormData({
                                        ...formData,
                                        description: e.target.value,
                                    })
                                }
                            />
                        </div>

                        {/* Priority and Status */}
                        <div className="grid gap-5 sm:grid-cols-2">

                            <div className="space-y-2">
                                <Label>Priority</Label>

                                <Select
                                    value={formData.priority}
                                    onValueChange={(value) =>
                                        setFormData({
                                            ...formData,
                                            priority: value,
                                        })
                                    }
                                >
                                    <SelectTrigger>
                                        <SelectValue />
                                    </SelectTrigger>

                                    <SelectContent>
                                        <SelectItem value="Low">Low</SelectItem>
                                        <SelectItem value="Medium">Medium</SelectItem>
                                        <SelectItem value="High">High</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>

                            <div className="space-y-2">
                                <Label>Status</Label>

                                <Select
                                    value={formData.status}
                                    onValueChange={(value) =>
                                        setFormData({
                                            ...formData,
                                            status: value,
                                        })
                                    }
                                >
                                    <SelectTrigger>
                                        <SelectValue />
                                    </SelectTrigger>

                                    <SelectContent>
                                        <SelectItem value="Pending">Pending</SelectItem>
                                        <SelectItem value="In Progress">
                                            In Progress
                                        </SelectItem>
                                        <SelectItem value="Completed">Completed</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>

                        </div>

                        {/* Due Date */}
                        <div className="space-y-2">
                            <Label htmlFor="dueDate">Due Date</Label>

                            <div className="relative">
                                <CalendarDays
                                    size={18}
                                    className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                                />

                                <Input
                                    id="dueDate"
                                    type="date"
                                    value={formData.dueDate}
                                    onChange={(e) =>
                                        setFormData({
                                            ...formData,
                                            dueDate: e.target.value,
                                        })
                                    }
                                    className="pl-10"
                                />
                            </div>
                        </div>

                        {/* Actions */}
                        <div className="flex justify-end gap-3 border-t pt-6">
                            <Button variant="outline" >
                                <Link href="/dashboard/todos">
                                    Cancel
                                </Link>
                            </Button>

                            <Button
                                type="submit"
                                className="bg-violet-600 hover:bg-violet-700"
                            >
                                Create Task
                            </Button>
                        </div>

                    </form>
                </CardContent>
            </Card>

        </div>
    );
}