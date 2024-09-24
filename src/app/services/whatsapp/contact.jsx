import axios from "axios";
import { apiBaseCrm } from ".";

export const getContact = async () => {
  const response = axios.get(`${apiBaseCrm}/whatsapp/contact`);
  return (await response).data;
};

export const actionContact = async (data, letterAction) => {
  const response = axios.post(`${apiBaseCrm}/whatsapp/contact`, {
    ...data,
    accion: letterAction,
    p_iniddomain: 1,
  });
  return (await response).data;
};
