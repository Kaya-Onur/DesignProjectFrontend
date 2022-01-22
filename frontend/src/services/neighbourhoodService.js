import axios from "axios";


export const getNeighbourhoods = () => {
    return axios.get("/api/1.0/admin/neighbourhoods/getAll");
  };

  export const deleteNeigbourhood=(neighbourhoodId)=>{
    return axios.delete(`/api/1.0/admin/neighbourhoods/delete?neighbourhoodId=${neighbourhoodId}`)
}