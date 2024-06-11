import axios from "axios";

export function deleteLogin(error, navigate) {
  if (error.response.data === "Invalid token") {
    console.log("Logging out");
    delete axios.defaults.headers.common["Authorization"];
    localStorage.removeItem("token");
  }

  if (!axios.defaults.headers.common["Authorization"]) {
    navigate("/");
  }
}
