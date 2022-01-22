import axios from "axios";

export const getAdvertTypes = () => {
    return axios.get("/api/1.0/all/advertTypes/getAll");
  };

  export const deleteAdverType=(advertTypeId)=>{
    return axios.delete(`/api/1.0/admin/advertTypes/delete?advertTypeId=${advertTypeId}`)
}

export const addAdvertType=(advertType)=>{
  return axios.post("/api/1.0/admin/advertTypes/add",advertType)
}