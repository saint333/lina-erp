import axios from "axios";

export const apiBaseCrm = import.meta.env.VITE_PUBLIC_API_URL_CRM

export const sendMessage = async (data) => {
  const response = await axios.post(`${apiBaseCrm}/whatsapp/bot/send`, data, {
    headers:{
      'Content-Type': "multipart/form-data"
    }
  });
  return (await response).data;
}