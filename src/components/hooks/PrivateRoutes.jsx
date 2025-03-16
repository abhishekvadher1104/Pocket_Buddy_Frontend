import { useEffect, useState } from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";

const useAuth = () => {
  const [authState, setAuthState] = useState({ isLoggedin: false, role: "" });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const id = localStorage.getItem("id");
    const role = localStorage.getItem("role");

    setAuthState({ isLoggedin: !!id, role: role || "" });
    setLoading(false);
  }, []); 
  return { ...authState, loading };
};

const PrivateRoutes = () => {
  const auth = useAuth();
  const location = useLocation();

  if (auth.loading) {
    return <h1>Loading...</h1>;
  }

  if (!auth.isLoggedin) {
    return <Navigate to="/login" />;
  }
  if (auth.role === "restaurant_owner" && location.pathname.startsWith("/user")) {
    return <Navigate to="/restro_owner" />;
  }

  // ✅ Restrict user from accessing /restro_owner
  if (auth.role === "user" && location.pathname.startsWith("/restro_owner") ) {
    return <Navigate to="/user" />;
  }

  return <Outlet />;
};

export default PrivateRoutes;
