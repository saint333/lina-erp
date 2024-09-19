import axios from "axios";
import { baseApi } from "../..";

export const ProductServices = async ({ data, letterAccion }) => {
  const response = axios.post(`${baseApi}/maintenance/product`, {
    ...data,
    p_iniddominio: 1,
    accion: letterAccion,
  });
  return (await response).data;
};

export const fetchDataProduct = async (padre, hijo) => {
  const response = axios.get(
    `${baseApi}/maintenance/family?padre=${padre}&hijo=${hijo}`
  );
  return (await response).data;
};

export const NewFamily = async (data, letterAccion) => {
  const response = axios.post(`${baseApi}/maintenance/family`, {
    p_inidfamiliadetalle: letterAccion == "I" ? 0 : data.p_inidfamiliadetalle,
    p_inidfamiliacabecera: letterAccion == "D" ? 0 : data.p_inidfamiliacabecera,
    p_inidfamiliacabecera2:
      letterAccion == "D" ? 0 : data.p_inidfamiliacabecera2,
    chfamiliadetalle: data.chfamiliadetalle,
    p_iniddominio: 1,
    accion: letterAccion,
  });
  return (await response).data;
};

export const productList = async () => {
  const response = axios.get(`${baseApi}/maintenance/product`);
  return (await response).data;
};

export const DetailProduct = async (id) => {
  const response = axios.get(`${baseApi}/maintenance/product/detail?p_inidproducto=${id}`);
  return (await response).data;
}
