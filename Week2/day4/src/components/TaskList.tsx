import { Task } from "@/types";
import { CalendarIcon, StarIcon } from "lucide-react";
import React from "react";
// Định dạng ngày tháng
const formatDate = (dateStr?: string) => {
    if (!dateStr) return "";
    const date = new Date(dateStr);
    if (isNaN(date.getTime())) return dateStr;
    // Nếu có giờ phút
    if (dateStr.includes("T")) {
        return date.toLocaleString("vi-VN", { hour: "2-digit", minute: "2-digit", day: "2-digit", month: "2-digit", year: "numeric" });
    }
    // Nếu chỉ có ngày
    return date.toLocaleDateString("vi-VN");
};

interface TaskListProps {
    tasks: Task[];
    onDelete?: (id: number) => void;
    onUpdate?: (task: Task) => void;
}

export const TaskList: React.FC<TaskListProps> = ({ tasks, onDelete, onUpdate }) => {

    const getPriorityColor = (priority: string) => {
        switch (priority) {
            case "high": return "bg-red-100 text-red-800";
            case "medium": return "bg-yellow-100 text-yellow-800";
            case "low": return "bg-green-100 text-green-800";
            default: return "bg-gray-100 text-gray-800";
        }
    };
    const getPriorityText = (priority: string) => {
        switch (priority) {
            case "high": return "Cao";
            case "medium": return "Trung bình";
            case "low": return "Thấp";
            default: return "Không xác định";
        }
    };

    return (
        <div className="bg-white rounded-lg shadow-sm">
            <div className="p-6 border-b border-gray-200 ">
                <h2 className="text-lg font-semibold text-gray-900">
                    Danh sách công việc ({tasks.length})
                </h2>
            </div>
            <div className="p-6">
                {tasks.length === 0 ? (
                    <div className="text-center py-8">
                        <p className="text-gray-500 text-black">Không tìm thấy công việc nào</p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {tasks.map((task) => {
                            let bg = "bg-cyan-100 dark:bg-cyan-900/40";
                            let titleColor = "text-black dark:text-white";
                            let descColor = "text-black dark:text-white";
                            if (task.priority === "high") {
                                bg = "bg-pink-100 dark:bg-pink-900/40";
                            } else if (task.priority === "medium") {
                                bg = "bg-yellow-100 dark:bg-yellow-900/40";
                            } else if (task.priority === "low") {
                                bg = "bg-green-100 dark:bg-green-900/40";
                            }
                            return (
                                <div
                                    key={task.id}
                                    className={`relative flex flex-col justify-between p-4 rounded-xl hover:bg-opacity-90 transition-colors group ${bg}`}
                                >
                                    <div className="flex items-center space-x-3 flex-1">
                                        <input
                                            type="checkbox"
                                            checked={task.status === "done"}
                                            className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500"
                                            readOnly
                                        />
                                        <div className="flex-1">
                                            <div className="flex items-center gap-2">
                                                <h3 className={`font-medium ${task.status === "done" ? 'line-through text-gray-900' : titleColor}`}>
                                                    {task.title}
                                                </h3>
                                                {('important' in task && (task as any).important) && (
                                                    <StarIcon className="w-4 h-4 text-yellow-500" />
                                                )}
                                            </div>
                                            <p className={`text-sm ${task.status === "done" ? 'text-gray-800' : descColor}`}>
                                                {task.description}
                                            </p>
                                        </div>
                                    </div>
                                    <div className="flex items-center space-x-3 mt-4">
                                        <span className={`px-2 py-1 text-xs font-medium rounded-full ${getPriorityColor(task.priority)}`}>
                                            {getPriorityText(task.priority)}
                                        </span>
                                        <div className="flex items-center gap-1 text-sm  text-black">
                                            <CalendarIcon className="w-4 h-4" />
                                            {formatDate(task.due_date)}
                                        </div>
                                    </div>
                                    <div className="absolute right-4 bottom-4 flex gap-2 opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-200 ease-in-out pointer-events-none group-hover:pointer-events-auto">
                                        <button
                                            onClick={() => onUpdate?.(task)}
                                            className="px-3 py-1 rounded-lg bg-blue-100 text-blue-700 hover:bg-blue-200 hover:text-blue-900 border border-blue-200 text-xs font-medium shadow-sm transition-colors"
                                        >
                                            Chỉnh sửa
                                        </button>
                                        <button
                                            onClick={() => onDelete?.(task.id)}
                                            className="px-3 py-1 rounded-lg bg-red-100 text-red-700 hover:bg-red-200 hover:text-red-900 border border-red-200 text-xs font-medium shadow-sm transition-colors"
                                        >
                                            Xóa
                                        </button>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                )}
            </div>
        </div>
    );
};
