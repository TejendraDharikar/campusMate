import { Navigate } from "react-router-dom";
import { useAuthStore } from "../context/useAuthStore";

function ProtectedRoute({ children, allowedRoles }) {
  const user = useAuthStore((state) => state.user);
  const hasHydrated = useAuthStore((state) => state.hasHydrated);

console.log("Hydrated:", hasHydrated, "User:", user);
console.log("ProtectedRoute user:", user);
console.log("ProtectedRoute role:", user?.role);

  if (!hasHydrated){
  console.log("Waiting for Zustand to hydrate...");
  return <div>Loading...</div>;
  }
  
  if (!user || !allowedRoles.includes(user.role)) {
    return <Navigate to="/" replace />;
  }

  return children;
}

export default ProtectedRoute;