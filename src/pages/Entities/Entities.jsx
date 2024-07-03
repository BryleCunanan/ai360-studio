import { Outlet, useNavigate } from "react-router-dom";
import axios from "axios";
import { deleteLogin } from "../../helpers/loginHelper";
import { useEffect } from "react";

const Entities = () => {
  const [style, setStyle] = useState({
    opacity: 0,
    transition: "opacity 0.5s",
  });

  const navigate = useNavigate();
  useEffect(() => {
    if (!axios.defaults.headers.common["Authorization"]) {
      deleteLogin(null, navigate);
    }
  }, []);

  useEffect(() => {
    setStyle({ opacity: 1, transition: "opacity 0.5s" });
  }, []);

  return (
    <div style={style}>
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
    </div>
  );
  // <Outlet />;
};

export default Entities;
