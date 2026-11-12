import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";

import { Button } from "@/components/ui/button";
import { AlertTriangle } from "lucide-react";

type DeleteTodoDialogProps = {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    todoTitle: string;
    onConfirm: () => void;
};

export default function DeleteTodoDialog({
    open,
    onOpenChange,
    todoTitle,
    onConfirm,
}: DeleteTodoDialogProps) {
    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-md">

                <DialogHeader>
                    <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-red-100 text-red-600">
                        <AlertTriangle size={24} />
                    </div>

                    <DialogTitle>Delete this task?</DialogTitle>

                    <DialogDescription>
                        Are you sure you want to delete{" "}
                        <span className="font-semibold text-slate-900">
                            {todoTitle}
                        </span>
                        ? This action cannot be undone.
                    </DialogDescription>
                </DialogHeader>

                <DialogFooter className="mt-4 gap-2">
                    <Button
                        variant="outline"
                        onClick={() => onOpenChange(false)}
                    >
                        Cancel
                    </Button>

                    <Button
                        variant="destructive"
                        onClick={onConfirm}
                    >
                        Delete Task
                    </Button>
                </DialogFooter>

            </DialogContent>
        </Dialog>
    );
}