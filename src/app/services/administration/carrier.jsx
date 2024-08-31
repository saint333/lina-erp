import axios from "axios";
import { baseApi } from "..";

export const getCarrier = async () => {
  const response = await axios.get(`${baseApi}/administration/transporter`);
  return response.data;
}

export const crudCarrier = async (data) => {
  const response = await axios.post(`${baseApi}/administration/transporter`,  data );
  return response.data;
}