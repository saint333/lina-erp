import axios from "axios";
export const baseApi = import.meta.env.VITE_PUBLIC_API_URL;

export const commonServices = async ({ letterAccion }) => {
  const response = axios.get(
    `${baseApi}/maintenance/master/detail?master=${letterAccion}`
  );
  return (await response).data;
};

export const DataHeader = async (session) => {
  const response = axios.get(`${baseApi}/auth/domain`);
  const lists = (await response).data;
  return { p_iniddominio_default: 1, lists };
};

export const SucursalData = async (session) => {
  const response = axios.get(`${baseApi}/auth/branch`);
  return (await response).data;
};

export const Master = async () => {
  const response = axios.get(`${baseApi}/maintenance/master`);
  return (await response).data;
}

export const addMaster = async ({data, letterAccion}) => {
  const response = axios.post(`${baseApi}/maintenance/master/detail`, {
    ...data,
    accion: letterAccion
  });
  return (await response).data;
}