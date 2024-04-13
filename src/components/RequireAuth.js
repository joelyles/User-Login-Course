import { useLocation, Navigate, Outlet } from "react-router-dom";
import useAuth from "../hooks/useAuth";

const RequireAuth = () => {
    const { auth } = useAuth();
    const location = useLocation();

    return (
        auth?.user
        ? <Outlet />

        // replaces back login with the location that they came from 
        : <Navigate to="/login" state={{ from: location }} replace />
    );
}

export default RequireAuth;