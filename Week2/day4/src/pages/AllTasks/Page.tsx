import { FC, useEffect, useState } from "react";
import { SearchIcon, PlusIcon } from "lucide-react";
import { Task } from "@/types";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,

} from "@/components/ui/dialog"

import { deleteAllTasks, getAllTasks, deleteTask, updateTask, autoadd } from "@/services/data";
import { TaskList } from "@/components/TaskList";
import { TaskForm } from "@/components/TaskForm";

const AllTasks: FC = () => {
    const [searchTerm, setSearchTerm] = useState("");
    const [filterPriority, setFilterPriority] = useState<string>("all");
    const [filterStatus, setFilterStatus] = useState<string>("all");
    const accessToken = localStorage.getItem("accessToken");
    const [tasks, setTasks] = useState<Task[]>([]);
    const [editTask, setEditTask] = useState<Task | null>(null);

    useEffect(() => {
        const fetchTasks = async () => {
            try {
                const fetchedTasks = await getAllTasks(accessToken || "");

                console.log("Fetched tasks:", fetchedTasks);

                setTasks(fetchedTasks);
            } catch (error) {
                console.error("Failed to fetch tasks:", error);
            }
        };
        fetchTasks();
    }, [accessToken]);

    const handleDeleteTask = async (id: number) => {
        if (!window.confirm("Bạn có chắc muốn xóa task này?")) return;
        try {
            await deleteTask(id, accessToken || "");
            setTasks(tasks.filter(t => t.id !== id));
        } catch (error) {
            alert("Không thể xóa task!");
        }
    };

    const handleUpdateTask = (task: Task) => {
        setEditTask(task);
    };

    const handleEditSubmit = async (updated: Partial<Task>) => {
        if (!editTask) return;
        try {
            const newTask = await updateTask(editTask.id, updated, accessToken || "");
            setTasks(tasks.map(t => t.id === newTask.id ? newTask : t));
            setEditTask(null);
        } catch (error) {
            alert("Không thể cập nhật task!");
        }
    };


    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-3xl font-bold text-gray-900 ">
                        Tất cả task
                    </h1>
                    <p className="text-gray-600 d mt-2">
                        Quản lý tất cả công việc của bạn
                    </p>
                </div>

                <button
                    onClick={async () => {
                        try {
                            await deleteAllTasks(accessToken || '');
                            // autoadd(accessToken || '');
                            alert("Đã xóa tất cả công việc!");
                        } catch (error) {
                            console.error("Failed to delete tasks:", error);
                            alert("Không thể xóa tất cả công việc!");
                        }
                    }}
                    className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-colors">

                    xoa hang lot
                </button>
                <button
                    onClick={async () => {
                        try {
                            // await deleteAllTasks(accessToken || '');
                            autoadd(accessToken || '');
                            alert("Đã xóa tất cả công việc!");
                        } catch (error) {
                            console.error("Failed to delete tasks:", error);
                            alert("Không thể xóa tất cả công việc!");
                        }
                    }}
                    className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-colors">

                    Them hang loa
                </button>


                <Dialog>
                    <DialogTrigger asChild>
                        <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-colors">
                            <PlusIcon className="w-4 h-4" />
                            Thêm task
                        </button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-[425px] bg-white rounded-lg shadow-lg border border-gray-200">
                        <DialogHeader>
                            <DialogTitle>Thêm task</DialogTitle>
                        </DialogHeader>
                        <TaskForm onTaskAdded={(newTask) => setTasks([newTask, ...tasks])} accessToken={accessToken || ''} />
                    </DialogContent>
                </Dialog>

            </div>

            {/* Filters */}
            <div className="bg-white  rounded-lg p-6 shadow-sm border border-gray-200 ">
                <div className="flex flex-col md:flex-row gap-4">
                    {/* Search */}
                    <div className="flex-1">
                        <div className="relative">
                            <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                            <input
                                type="text"
                                placeholder="Tìm kiếm công việc..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="w-full pl-10 pr-4 py-2 border border-gray-300  rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent  d"
                            />
                        </div>
                    </div>


                    <div className="flex gap-2">
                        <select
                            value={filterPriority}
                            onChange={(e) => setFilterPriority(e.target.value)}
                            className="px-3 py-2 border border-gray-300  rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent "
                        >
                            <option value="all">Tất cả độ ưu tiên</option>
                            <option value="high">Cao</option>
                            <option value="medium">Trung bình</option>
                            <option value="low">Thấp</option>
                        </select>

                        <select
                            value={filterStatus}
                            onChange={(e) => setFilterStatus(e.target.value)}
                            className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent "
                        >
                            <option value="all">Tất cả trạng thái</option>
                            <option value="pending">Chưa hoàn thành</option>
                            <option value="completed">Đã hoàn thành</option>
                        </select>
                    </div>
                </div>
            </div>

            {/* Tasks List */}

            <TaskList
                tasks={tasks}
                onDelete={handleDeleteTask}
                onUpdate={handleUpdateTask}
            />

            {/* Dialog chỉnh sửa task */}
            {editTask && (
                <Dialog open={!!editTask} onOpenChange={open => { if (!open) setEditTask(null); }}>
                    <DialogContent className="sm:max-w-[425px] bg-white rounded-lg shadow-lg border border-gray-200">
                        <DialogHeader>
                            <DialogTitle>Chỉnh sửa task</DialogTitle>
                        </DialogHeader>
                        <TaskForm
                            accessToken={accessToken || ''}
                            initialTask={editTask}
                            onTaskAdded={(updated) => handleEditSubmit(updated)}
                            isEdit
                        />
                    </DialogContent>
                </Dialog>
            )}

        </div>
    );
};

export default AllTasks; 