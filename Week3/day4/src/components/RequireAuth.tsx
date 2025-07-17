import { useAuthStore } from "@/context/useAuthStore";
import { Navigate, useLocation } from "react-router-dom";

const RequireAuth = ({ children }: { children: React.ReactNode }) => {
    const { access_token } = useAuthStore();
    const location = useLocation();

    if (!access_token) {
        return <Navigate to="/login" state={{ from: location }} replace />;
    }
    return <>{children}</>;
};

export default RequireAuth;