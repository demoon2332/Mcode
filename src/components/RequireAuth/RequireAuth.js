import { useEffect } from "react";
import { useLocation, Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../../context/AuthProvider";
import {jwtDecode} from "jwt-decode"; 

const RequireAuth = ({ allowedRoles }) => {
    const { auth, setAuth, isAuthenticated } = useAuth();
    const location = useLocation();

    useEffect(() => {
        console.log("Use effect in RequireAuth:");
        console.log(auth);
    // }, [auth.accessToken, setAuth]);
    },[])

    return (
        auth?.roles?.find((role) => allowedRoles?.includes(role))
            ? <Outlet />
            : isAuthenticated()
                ? <Navigate to="/unauthorized" state={{ from: location }} replace />
                : <Navigate to="/login" state={{ from: location }} replace />
    );
};

export default RequireAuth;