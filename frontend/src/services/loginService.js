import axios from "axios";

export const login = (creds) => {
  return axios.post("/api/1.0/auth", {}, { auth: creds });
};