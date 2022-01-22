import axios from "axios";


export const getByCityId = (cityId) => {
  return axios.get(`/api/1.0/admin/cities/cityId?cityId=${cityId}`);
};

export const getCities = () => {
    return axios.get("/api/1.0/admin/cities/getAll");
  };

  export const deleteCity=(cityId)=>{
    return axios.delete(`/api/1.0/admin/cities/delete?cityId=${cityId}`)
}