import axios from "axios";
import { apiBaseCrm } from ".";

export const getBots = async () => {
  const response = axios.get(`${apiBaseCrm}/whatsapp/bot`);
  return (await response).data;
};

export const getQR = async (id) => {
  const response = axios.get(`${apiBaseCrm}/whatsapp/bot/qr?bot=${id}`, {
    responseType: "blob",
  });
  return (await response).data;
};

export const getFlow = async (id) => {
  const response = axios.get(`${apiBaseCrm}/whatsapp/flow?bot=${id}`);
  return (await response).data;
};

export const getFlowDetail = async (id) => {
  const response = axios.get(`${apiBaseCrm}/whatsapp/flowdetail?flow=${id}`);
  return (await response).data;
};

export const actionFlow = async (data, letterAction) => {
  const response = axios.post(`${apiBaseCrm}/whatsapp/flow`, {
    ...data,
    accion: letterAction,
  });
  return (await response).data;
};

export const actionFlowDetail = async (data) => {
  const response = axios.post(`${apiBaseCrm}/whatsapp/flowdetail`, data);
  return (await response).data;
};

export const actionFlowDetail2 = async (data) => {
  const response = axios.post(`${apiBaseCrm}/whatsapp/flowdetail`, data, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return (await response).data;
};

export const botRestart = async (id) => {
  const response = axios.get(`${apiBaseCrm}/whatsapp/bot/restart?bot=${id}`);
  return (await response).data;
};
