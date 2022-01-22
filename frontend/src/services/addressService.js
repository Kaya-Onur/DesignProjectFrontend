import axios from "axios";

export const getAddresses = () => {
    return axios.get("/api/1.0/admin/addresses/getAll");
  };

export const deleteAddress=(addressId)=>{
    return axios.delete(`/api/1.0/admin/addresses/delete?addressId=${addressId}`)
}

export const updateAddress = (addresses) => {
  return axios.put("/api/1.0/admin/addresses/update",addresses)
 };

 export const addAddress = (body) => {
  return axios.post("/api/1.0/admin/addresses/add", body);
};