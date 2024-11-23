import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthContext } from "./useAuthContext";

const useAuthRedirect = () => {
  const navigate = useNavigate();
  const { currentUser } = useAuthContext();
  useEffect(() => {
    if (!currentUser) {
      navigate("/login");
    }
  }, []);

  return {
    currentUser,
  };
};

export default useAuthRedirect;
