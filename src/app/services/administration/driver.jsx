import axios from "axios";
import { baseApi } from "..";

export const getDriver = async () => {
  const response = await axios.get(`${baseApi}/administration/driver`);
  return (await response).data;
}

export const crudDriver = async (data) => {
  const response = await axios.post(`${baseApi}/administration/driver`,  data );
  return (await response).data;
}