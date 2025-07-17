import { useAuthStore } from "@/context/useAuthStore";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

const Login = () => {
    const { access_token, login, loading, error } = useAuthStore();
    const navigate = useNavigate();
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [localError, setLocalError] = useState<string | null>(null);

    useEffect(() => {
        if (access_token) {
            navigate("/all-tasks");
        }
    }, [access_token, navigate]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!username || !password) {
            setLocalError("Vui lòng nhập đầy đủ tài khoản và mật khẩu.");
            return;
        }
        setLocalError(null);
        await login({ username, password, navigate });
    };

    return (
        <form onSubmit={handleSubmit} className="flex flex-col gap-4 max-w-sm mx-auto mt-20 p-6 bg-white rounded shadow">
            <input
                value={username}
                onChange={e => { setUsername(e.target.value); setLocalError(null); }}
                placeholder="Username"
                className="border p-2 rounded"
            />
            <input
                value={password}
                onChange={e => { setPassword(e.target.value); setLocalError(null); }}
                type="password"
                placeholder="Password"
                className="border p-2 rounded"
            />
            <button type="submit" disabled={loading} className="bg-blue-600 text-white p-2 rounded">Login</button>
            {(localError || error) && <div className="text-red-500">{localError || error?.message || "Login failed"}</div>}
        </form>
    );
};

export default Login;
