import { Outlet, useNavigate } from "react-router-dom";
import axios from "axios";
import { deleteLogin } from "../../helpers/loginHelper";
import { useEffect } from "react";

const Entities = () => {
  const navigate = useNavigate();
  useEffect(() => {
    if (!axios.defaults.headers.common["Authorization"]) {
      deleteLogin(null, navigate);
    }
  }, []);

  return (
    <h1
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "50%",
      }}
    >
      Coming Soon...
    </h1>
  );
  // <Outlet />;
};

export default Entities;
