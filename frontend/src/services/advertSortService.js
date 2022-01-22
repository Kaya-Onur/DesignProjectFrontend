import axios from "axios";

export const getAdvertSorts = () => {
    return axios.get("/api/1.0/all/advertSorts/getAll");
  };

  export const deleteAdvertSort=(advertSortId)=>{
    return axios.delete(`/api/1.0/admin/advertSorts/delete?advertSortId=${advertSortId}`)
}

export const addAdvertSort=(advertSort)=>{
  return axios.post("/api/1.0/admin/advertSorts/add",advertSort)
}