import axios from "axios";
import { baseApi } from "..";

export const getVehicles = async () => {
  const response = await axios.get(`${baseApi}/administration/vehicle`);
  return response.data;
}

export const crudVehicles = async (data) => {
  const response = await axios.post(`${baseApi}/administration/vehicle`,  data );
  return response.data;
}