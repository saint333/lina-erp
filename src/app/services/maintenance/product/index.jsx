import axios from "axios";
import { baseApi } from "../..";

export const ProductServices = async ({ data, accion, letterAccion }) => {
  const response = axios.post(`${baseApi}/maintenance/product`, {
    p_inidproducto: 3068,
    p_iniddominio: 1,
    chcodigoproducto: "",
    chcodigoproductoantes: "",
    p_inidfamilia: 0,
    p_inidtipo: 0,
    p_inidmarca: 0,
    p_inidmodelo: 0,
    p_inidcalibre: 0,
    p_inidacabado: 0,
    p_inidcapacidad: 0,
    p_inidunidadmedida: 0,
    nucantporuni: 0,
    chdescripcion: "PRUEBA ",
    nustockminima: 0,
    nuprecio: 5,
    nuprecio2: 5,
    nuprecio3: 5,
    nuprecio4: 5,
    p_inidsituacion: true,
    req_serie: true,
    paginaweb: true,
    destacado: true,
    churl: "",
    accion: "U",
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
