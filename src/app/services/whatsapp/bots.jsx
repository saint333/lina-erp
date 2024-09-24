import axios from "axios";
import { apiBaseCrm } from ".";

export const getBots = async () => {
  const response = axios.get(`${apiBaseCrm}/whatsapp/bot`);
  return (await response).data;
};

export const getQR = async (id) => {
  const response = axios.get(`${apiBaseCrm}/api/whatsapp/qrcode/${id}`,{
    responseType: 'blob'
  });
  return (await response).data;
};
