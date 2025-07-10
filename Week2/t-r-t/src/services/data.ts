import { Task } from "@/types";

export type TaskCreateInput = {
    title: string;
    description?: string;
    priority: "low" | "medium" | "high";
    status: "to_do" | "in_progress" | "done";
    start_date: string;
    due_date: string;
    assignee_id: number;
};

export const getAllTasks = async (accessToken: string): Promise<Task[]> => {
    const res = await fetch("https://server.aptech.io/workspaces/tasks", {
        method: "GET",
        headers: {
            "Authorization": `Bearer ${accessToken}`,
            "Content-Type": "application/json"
        }
    });
    if (!res.ok) {
        throw new Error("Không thể lấy danh sách tasks!");
    }
    return res.json();
};


export const getTaskById = async (taskId: number, accessToken: string): Promise<Task> => {
    const res = await fetch(`https://server.aptech.io/workspaces/tasks/${taskId}`, {
        method: "GET",
        headers: {
            "Authorization": `Bearer ${accessToken}`,
            "Content-Type": "application/json"
        }
    });
    if (!res.ok) {
        throw new Error("Không thể lấy task!");
    }
    return res.json();
};

export const createTask = async (task: TaskCreateInput, accessToken: string): Promise<Task> => {
    const res = await fetch("https://server.aptech.io/workspaces/tasks", {
        method: "POST",
        headers: {
            "Authorization": `Bearer ${accessToken}`,
            "Content-Type": "application/json"
        },
        body: JSON.stringify(task)
    });
    if (!res.ok) {
        throw new Error("Không thể tạo task mới!");
    }
    return res.json();
};

export const updateTask = async (taskId: number, updates: Partial<Task>, accessToken: string): Promise<Task> => {
    const res = await fetch(`https://server.aptech.io/workspaces/tasks/${taskId}`, {
        method: "PATCH",
        headers: {
            "Authorization": `Bearer ${accessToken}`,
            "Content-Type": "application/json"
        },
        body: JSON.stringify(updates)
    });
    if (!res.ok) {
        throw new Error("Không thể cập nhật task!");
    }
    return res.json();
};


export const deleteTask = async (taskId: number, accessToken: string): Promise<void> => {
    const res = await fetch(`https://server.aptech.io/workspaces/tasks/${taskId}`, {
        method: "DELETE",
        headers: {
            "Authorization": `Bearer ${accessToken}`,
            "Content-Type": "application/json"
        }
    });
    if (!res.ok) {
        throw new Error("Không thể xóa task!");
    }
};

export const deleteAllTasks = async (accessToken: string): Promise<void> => {
    const tasks = await getAllTasks(accessToken);

    await Promise.all(
        tasks.map(task => deleteTask(task.id, accessToken))
    );
};

export const autoadd = async (accessToken: string): Promise<void> => {
    for (let i = 0; i < 20; i++) {
        const task: TaskCreateInput = {
            title: `meryquan hansome guy1 ${i + 1}`,
            description: `meryquan hansome guy1 ${i + 1}`,
            priority: i % 3 === 0 ? "high" : i % 3 === 1 ? "medium" : "low",
            status: "to_do",
            start_date: new Date().toISOString(),
            due_date: new Date(Date.now() + (i + 1) * 24 * 60 * 60 * 1000).toISOString(),
            assignee_id: 1
        };
        await createTask(task, accessToken);
    }

}