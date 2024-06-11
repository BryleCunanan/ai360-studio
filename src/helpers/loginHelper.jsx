import axios from "axios";
import { useNavigate } from "react-router-dom";

export function deleteLogin(error, url) {
  const navigate = useNavigate();

  if (error.response.data === "Invalid token") {
    console.log("Logging out");
    delete axios.defaults.headers.common["Authorization"];
    localStorage.removeItem("token");
  }

  if (!axios.defaults.headers.common["Authorization"]) {
    navigate(url);
  }
}
