import { useEffect } from "react";
// import { useSession } from "/hooks/useSession";
import { useNavigate } from "react-router-dom";

const ProtectedRoute = ({ children, needLogged = true }) => {
  const navigate = useNavigate();
  //   const { usuario } = useSession();

  useEffect(() => {
    // if (!usuario.id && needLogged) return navigate("/login");
  }, []);

  return children;
};

export default ProtectedRoute;
