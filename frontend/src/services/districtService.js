import axios from "axios";


export const getDistricts = () => {
    return axios.get("/api/1.0/admin/districts/getAll");
  };

  export const deleteDistrict=(districtId)=>{
    return axios.delete(`/api/1.0/admin/districts/delete?districtId=${districtId}`)
}