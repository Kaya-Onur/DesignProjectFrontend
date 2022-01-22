import axios from "axios";

export const getAdverts = () => {
  return axios.get("/api/1.0/all/adverts/getAll");
};

export const getByAdvertId = (advertId) => {
  return axios.get(`/api/1.0/all/adverts/advertId?advertId=${advertId}`);
};

export const deleteAdvert = (advertId) => {
  return axios.delete(`/api/1.0/all/adverts/delete?advertId=${advertId}`);
};

export const updateAdvert = (advert) => {
 return axios.put("/api/1.0/all/adverts/update",advert)
};

export const addAdvert = (body) => {
  return axios.post("/api/1.0/all/adverts/add", body);
};