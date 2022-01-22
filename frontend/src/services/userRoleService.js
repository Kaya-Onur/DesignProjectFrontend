import axios from "axios";

export const getUserRole = () => {
  return axios.get("/api/1.0/admin/userRoles/getAll");
};

