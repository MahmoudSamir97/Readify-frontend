import { Route, Navigate, useNavigate, Routes } from "react-router-dom";

const ProtectedRoute = ({ element, ...rest }) => {
  const isAuthenticated = localStorage.getItem("token");
  console.log(isAuthenticated);
  let navigate = useNavigate();

  return isAuthenticated ? (
    <Routes>
      <Route {...rest} element={element} />
    </Routes>
  ) : (
    <Navigate to="/login" />
  );
};

export default ProtectedRoute;
