import axios from "axios";

export function deleteLogin(error, navigate) {
  if (error?.response?.data === "Invalid token" || error == "logout") {
    console.log("Logging out");
    delete axios.defaults.headers.common["Authorization"];
    localStorage.clear();
  }

  if (!axios.defaults.headers.common["Authorization"]) {
    navigate("/");
  }
}
