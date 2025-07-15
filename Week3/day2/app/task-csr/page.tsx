"use client";
import { useEffect, useState } from "react";
import { getAllTasks } from "@/lib/api";
import { Task } from "@/types";

export default function TaskCSRPage() {
    const [tasks, setTasks] = useState<Task[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const accessToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwidXNlcm5hbWUiOiJ0dW5nbnRAc29mdGVjaC52biIsImVtYWlsIjoidHVuZ250QHNvZnRlY2gudm4iLCJzdWIiOjEsImFwcGxpY2F0aW9uIjoiT25saW5lIFNob3AgLSBBUEkiLCJyb2xlcyI6W3siaWQiOjEsIm5hbWUiOiJBZG1pbmlzdHJhdG9ycyJ9LHsiaWQiOjIsIm5hbWUiOiJNYW5hZ2VycyJ9XSwiaWF0IjoxNzUyNTYyMTU4LCJleHAiOjE3ODQxMTk3NTh9.HOm_lhTK0ArEDjyIvaa1HG388fsNXMAcG9f2nxeIKt8";
        getAllTasks(accessToken).then((data) => {
            setTasks(data);
            setLoading(false);
        });
    }, []);

    if (loading) return <div>Loading...</div>;

    return (
        <div className="max-w-3xl mx-auto py-8">
            <h1 className="text-3xl font-bold mb-6 text-center">CSR Task List</h1>
            <ul>
                {tasks.map((task) => (
                    <div
                        key={task.id}
                        className="bg-white border rounded-lg shadow p-6 flex flex-col md:flex-row md:items-center md:justify-between hover:shadow-lg transition-shadow"
                    >
                        <div>
                            <h2 className="text-xl font-semibold mb-1">{task.title}</h2>
                            <p className="text-gray-500 mb-2 text-sm">{task.description}</p>
                            <div className="flex flex-wrap gap-2 text-xs">
                                <span className={
                                    `px-2 py-1 rounded font-medium ${task.priority === 'high' ? 'bg-red-100 text-red-700' :
                                        task.priority === 'medium' ? 'bg-yellow-100 text-yellow-700' :
                                            'bg-green-100 text-green-700'
                                    }`
                                }>
                                    Priority: {task.priority}
                                </span>
                                <span className={
                                    `px-2 py-1 rounded font-medium ${task.status === 'done' ? 'bg-green-200 text-green-800' :
                                        task.status === 'in_progress' ? 'bg-blue-100 text-blue-700' :
                                            'bg-gray-100 text-gray-700'
                                    }`
                                }>
                                    Status: {task.status.replace('_', ' ')}
                                </span>
                                <span className="px-2 py-1 rounded bg-gray-50 text-gray-500 border">Due: {new Date(task.due_date).toLocaleDateString()}</span>
                            </div>
                        </div>
                    </div>
                ))}
            </ul>
        </div>
    );
}
