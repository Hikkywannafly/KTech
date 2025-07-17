import { Task } from "@/types";
import { apiClient } from "@/services/api-client";

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
    const res = await apiClient.get("/workspaces/tasks", {
        headers: {
            "Authorization": `Bearer ${accessToken}`,
        }
    });
    return res.data;
};

export const getTaskById = async (taskId: number, accessToken: string): Promise<Task> => {
    const res = await apiClient.get(`/workspaces/tasks/${taskId}`, {
        headers: {
            "Authorization": `Bearer ${accessToken}`,
        }
    });
    return res.data;
};

export const createTask = async (task: TaskCreateInput, accessToken: string): Promise<Task> => {
    const res = await apiClient.post("/workspaces/tasks", task, {
        headers: {
            "Authorization": `Bearer ${accessToken}`,
        }
    });
    return res.data;
};

export const updateTask = async (taskId: number, updates: Partial<Task>, accessToken: string): Promise<Task> => {
    const res = await apiClient.patch(`/workspaces/tasks/${taskId}`, updates, {
        headers: {
            "Authorization": `Bearer ${accessToken}`,
        }
    });
    return res.data;
};

export const deleteTask = async (taskId: number, accessToken: string): Promise<void> => {
    await apiClient.delete(`/workspaces/tasks/${taskId}`, {
        headers: {
            "Authorization": `Bearer ${accessToken}`,
        }
    });
};

export const deleteAllTasks = async (accessToken: string): Promise<void> => {
    const tasks = await getAllTasks(accessToken);
    await Promise.all(
        tasks.map(task => deleteTask(task.id, accessToken))
    );
};

export const autoadd = async (accessToken: string): Promise<void> => {
    for (let i = 0; i < 50; i++) {
        const task: TaskCreateInput = {
            title: `skibidi ${i + 1}`,
            description: `mskibidi dom dom yubyu byub ${i + 1}`,
            priority: i % 3 === 0 ? "high" : i % 3 === 1 ? "medium" : "low",
            status: "to_do",
            start_date: new Date().toISOString(),
            due_date: new Date(Date.now() + (i + 1) * 24 * 60 * 60 * 1000).toISOString(),
            assignee_id: 1
        };
        await createTask(task, accessToken);
    }
}