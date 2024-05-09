import { useAuth } from "@/contexts/AuthContext";
import { Navigate } from "react-router-dom";

function PrivateLayout({ children }) {
  const { user } = useAuth();
  

  return <>{user ? children : <Navigate to="/signin" />}</>;
}

export default PrivateLayout;
