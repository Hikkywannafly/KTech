import {
    CheckSquareIcon,
    SquareIcon,
    PlusIcon,
    CalendarIcon,
    StarIcon,
    HomeIcon,
    SettingsIcon,
    ChevronLeftIcon,
    ChevronRightIcon,
    MenuIcon,
    XIcon,
    SunIcon,
    MoonIcon
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
    {
        title: "Dashboard",
        to: "/",
        icon: HomeIcon,
        description: "Tổng quan công việc"
    },
    {
        title: "Tất cả công việc",
        to: "/all-tasks",
        icon: CheckSquareIcon,
        description: "Xem tất cả công việc"
    },
    // {
    //     title: "Công việc hôm nay",
    //     to: "/today",
    //     icon: CalendarIcon,
    //     description: "Công việc cần làm hôm nay"
    // },
    // {
    //     title: "Quan trọng",
    //     to: "/important",
    //     icon: StarIcon,
    //     description: "Công việc ưu tiên cao"
    // },
    // {
    //     title: "Đã hoàn thành",
    //     to: "/completed",
    //     icon: CheckSquareIcon,
    //     description: "Công việc đã hoàn thành"
    // },

    // {
    //     title: "Cài đặt",
    //     to: "/settings",
    //     icon: SettingsIcon,
    //     description: "Cài đặt ứng dụng"
    // }
    {
        title: "Thêm mới",
        to: "/add-task",
        icon: PlusIcon,
        description: "Thêm công việc mới"
    }
];
