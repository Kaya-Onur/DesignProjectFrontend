import axios from "axios";

export const addUser = (body) => {
  return axios.post("/api/1.0/all/users/add", body);
};

export const updateUser = (body) => {
  return axios.put("/api/1.0/all/users/update", body);
};

export const getUsers=()=>{
  return axios.get("/api/1.0/admin/users/getAll")
}

export const deleteUser=(userId)=>{
  return axios.delete(`/api/1.0/admin/users/delete?userId=${userId}`)
}

export const getByUserId=(userId)=>{
  return axios.get(`/api/1.0/all/users/userId?userId=${userId}`)
}