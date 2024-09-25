import axios from "axios";
import { apiBaseCrm } from ".";

export const getBots = async () => {
  const response = axios.get(`${apiBaseCrm}/whatsapp/bot`);
  return (await response).data;
};

export const getQR = async (id) => {
  const response = axios.get(`${apiBaseCrm}/whatsapp/bot/qr?bot=${id}`,{
    responseType: 'blob'
  });
  return (await response).data;
};

export const getFlow = async (id) => {
  const response = axios.get(`${apiBaseCrm}/whatsapp/flow?bot=${id}`);
  return (await response).data;
}

export const getFlowDetail = async (id) => {
  const response = axios.get(`${apiBaseCrm}/whatsapp/flowdetail?flow=${id}`);
  return (await response).data;
}