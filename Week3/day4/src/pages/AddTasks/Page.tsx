import { FC } from "react";
import { useNavigate } from "react-router-dom";
import { TaskForm } from "@/components/TaskForm";

const AddTaskPage: FC = () => {
    const navigate = useNavigate();
    const accessToken = localStorage.getItem("accessToken") || "";

    return (
        <div className="max-w-xl mx-auto mt-10 bg-white p-8 rounded-lg shadow">
            <h1 className="text-2xl font-bold mb-6 text-center">Thêm công việc mới</h1>
            <TaskForm
                accessToken={accessToken}
                onTaskAdded={() => navigate("/all-tasks")}
                hideDialogClose={true}
            />
        </div>
    );
};

export default AddTaskPage; 