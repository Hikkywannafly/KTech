import { useState, useEffect } from "react";
import { createTask } from "@/services/data";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { DialogFooter, DialogClose } from "@/components/ui/dialog";
import { Task } from "@/types";

interface TaskFormProps {
    onTaskAdded: (task: any) => void;
    accessToken: string;
    initialTask?: Task;
    isEdit?: boolean;
}

export const TaskForm = ({ onTaskAdded, accessToken, initialTask, isEdit }: TaskFormProps) => {
    const [title, setTitle] = useState(initialTask?.title || "");
    const [description, setDescription] = useState(initialTask?.description || "");
    const [priority, setPriority] = useState(initialTask?.priority || "medium");
    const [status, setStatus] = useState(initialTask?.status || "to_do");
    const [startDate, setStartDate] = useState(initialTask?.start_date || "");
    const [dueDate, setDueDate] = useState(initialTask?.due_date || "");
    const [assigneeId, setAssigneeId] = useState(initialTask?.assignee_id || 1);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    useEffect(() => {
        if (initialTask) {
            setTitle(initialTask.title || "");
            setDescription(initialTask.description || "");
            setPriority(initialTask.priority || "medium");
            setStatus(initialTask.status || "to_do");
            setStartDate(initialTask.start_date || "");
            setDueDate(initialTask.due_date || "");
            setAssigneeId(initialTask.assignee_id || 1);
        }
    }, [initialTask]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError("");
        try {
            if (isEdit && initialTask) {
                // Chỉ gửi các trường thay đổi
                const updates: Partial<Task> = {};
                if (title !== initialTask.title) updates.title = title;
                if (description !== initialTask.description) updates.description = description;
                if (priority !== initialTask.priority) updates.priority = priority as any;
                if (status !== initialTask.status) updates.status = status as any;
                if (startDate !== initialTask.start_date) updates.start_date = startDate;
                if (dueDate !== initialTask.due_date) updates.due_date = dueDate;
                if (assigneeId !== initialTask.assignee_id) updates.assignee_id = assigneeId;
                onTaskAdded(updates);
            } else {
                const newTask = await createTask({
                    title,
                    description,
                    priority,
                    status,
                    start_date: startDate,
                    due_date: dueDate,
                    assignee_id: assigneeId,
                } as any, accessToken);
                onTaskAdded(newTask);
                setTitle("");
                setDescription("");
                setPriority("medium");
                setStatus("to_do");
                setStartDate("");
                setDueDate("");
                setAssigneeId(1);
            }
        } catch (err: any) {
            setError(err.message || "Có lỗi xảy ra!");
        } finally {
            setLoading(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid gap-3">
                <Label htmlFor="title">Tiêu đề</Label>
                <Input id="title" value={title} onChange={e => setTitle(e.target.value)} required />
            </div>
            <div className="grid gap-3">
                <Label htmlFor="description">Mô tả</Label>
                <Input id="description" value={description} onChange={e => setDescription(e.target.value)} />
            </div>
            <div className="grid gap-3">
                <Label htmlFor="priority">Độ ưu tiên</Label>
                <select id="priority" value={priority} onChange={e => setPriority(e.target.value as "low" | "medium" | "high")} className="px-3 py-2 border rounded-lg">
                    <option value="high">Cao</option>
                    <option value="medium">Trung bình</option>
                    <option value="low">Thấp</option>
                </select>
            </div>
            <div className="grid gap-3">
                <Label htmlFor="status">Trạng thái</Label>
                <select id="status" value={status} onChange={e => setStatus(e.target.value as "to_do" | "in_progress" | "done")} className="px-3 py-2 border rounded-lg">
                    <option value="to_do">Chưa làm</option>
                    <option value="in_progress">Đang làm</option>
                    <option value="done">Hoàn thành</option>
                </select>
            </div>
            <div className="grid gap-3">
                <Label htmlFor="start_date">Ngày bắt đầu</Label>
                <Input id="start_date" type="datetime-local" value={startDate} onChange={e => setStartDate(e.target.value)} required />
            </div>
            <div className="grid gap-3">
                <Label htmlFor="due_date">Hạn chót</Label>
                <Input id="due_date" type="datetime-local" value={dueDate} onChange={e => setDueDate(e.target.value)} required />
            </div>
            <div className="grid gap-3">
                <Label htmlFor="assignee_id">Người nhận việc (ID)</Label>
                <Input id="assignee_id" type="number" value={assigneeId} onChange={e => setAssigneeId(Number(e.target.value))} min={1} required />
            </div>
            {error && <div className="text-red-500 text-sm">{error}</div>}
            <DialogFooter>
                <DialogClose asChild>
                    <Button variant="outline" type="button">Hủy</Button>
                </DialogClose>
                <Button type="submit" disabled={loading}>{loading ? (isEdit ? "Đang lưu..." : "Đang thêm...") : (isEdit ? "Lưu thay đổi" : "Lưu task")}</Button>
            </DialogFooter>
        </form>
    );
}; 