import {
    CheckSquareIcon,
    PlusIcon,
} from "lucide-react"


export interface Task {
    id: number;
    created_time: string;
    updated_time: string;
    deleted_time: string | null;
    created_by: number;
    updated_by: number;
    deleted_by: number | null;
    title: string;
    description: string | null;
    start_date: string;
    due_date: string;
    completed_date: string | null;
    priority: "low" | "medium" | "high";
    status: "to_do" | "in_progress" | "done";
    assignee_id: number;
    parent_id: number | null;
    project_id: number | null;
}

export const menuItems = [
    // {
    //     title: "Dashboard",
    //     to: "/",
    //     icon: HomeIcon,
    //     description: "Tổng quan công việc"
    // },
    {
        title: "Tất cả công việc",
        to: "/all-tasks",
        icon: CheckSquareIcon,
        description: "Xem tất cả công việc"
    },
    {
        title: "Thêm mới",
        to: "/add-task",
        icon: PlusIcon,
        description: "Thêm công việc mới"
    }
];