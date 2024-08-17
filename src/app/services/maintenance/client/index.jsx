import axios from "axios";
import { baseApi } from "../..";

export const ClientServices = async ({ data, letterAccion }) => {
  const response = axios.post(`${baseApi}/maintenance/client`, {
    p_iniddominio: 1,
    accion: letterAccion,
    ...data,
  });
  return (await response).data;
};

export const CardServices = async ({ data, letterAccion }) => {
  const response = axios.post(`${baseApi}/maintenance/client/card`, {
    ...data,
    accion: letterAccion,
  });
  return (await response).data;
};

export const LicenseServices = async ({ data, letterAccion }) => {
  const response = axios.post(`${baseApi}/maintenance/client/license`, {
    ...data,
    accion: letterAccion,
  });
  return (await response).data;
};

export const ResolucionServices = async ({ data, letterAccion }) => {
  const response = axios.post(`${baseApi}/maintenance/client/resolution`, {
    ...data,
    accion: letterAccion,
  });
  return (await response).data;
};

export const DetailClientServices = async ({ client, legal }) => {
  const response = axios.get(
    `${baseApi}/maintenance/client/detail?p_inidcliente=${client}&p_inidjurinat=${legal}`
  );
  return (await response).data;
};

export const CardList = async () => {
  const response = axios.get(`${baseApi}/maintenance/client/card`);
  return (await response).data;
};

export const List = async () => {
  const response = axios.get(`${baseApi}/maintenance/client`);
  return (await response).data;
};

export const LicenseList = async () => {
  const response = axios.get(`${baseApi}/maintenance/client/license`);
  return (await response).data;
};

export const ResolutionList = async () => {
  const response = axios.get(`${baseApi}/maintenance/client/resolution`);
  return (await response).data;
};
