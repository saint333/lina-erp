import axios from "axios";
import { baseApi } from "../..";

export const SupplierList = async () => {
  const response = axios.get(`${baseApi}/maintenance/provider`);
  return (await response).data;
};

export const SupplierServices = async ({ data, letterAccion }) => {
  const response = axios.post(`${baseApi}/maintenance/provider`, {
    ...data,
    chfechanacimiento: data?.chfechanacimiento?.split("-")?.reverse()?.join("-") || null,
    p_iniddominio: 1,
    accion: letterAccion,
  });
  return (await response).data;
};

export const DetailSupplierServices = async ({ client, legal }) => {
  const response = axios.get(
    `${baseApi}/maintenance/provider/detail?p_inidproveedor=${client}&p_inidjurinat=${legal}`
  );
  return (await response).data;
};
