import { Navigate } from "react-router-dom";
import { useAuth } from "../../authContext/AuthContext";

export function ProtectedRoute ({ element }){
    const { isAuthenticated  } = useAuth();

    return isAuthenticated ? element : <Navigate to="/login" />;

}