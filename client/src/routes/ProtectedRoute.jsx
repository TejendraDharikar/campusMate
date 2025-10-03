import { Navigate } from "react-router-dom";
import { useAuthStore } from "../context/useAuthStore";

function ProtectedRoute({ children, allowedRoles }) {
  const user = useAuthStore((state) => state.user);

  if (!user || !allowedRoles.includes(user.role)) {
    return <Navigate to="/" replace />;
  }

  return children;
}

export default ProtectedRoute;