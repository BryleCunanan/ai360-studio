import axios from "axios";

export function deleteLogin(error, navigate) {
  console.log(error);
  if (error.response.data === "Invalid token") {
    console.log("Logging out");
    delete axios.defaults.headers.common["Authorization"];
  }
  if (!axios.defaults.headers.common["Authorization"]) {
    navigate("/");
  }
}
