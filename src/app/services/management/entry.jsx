import axios from "axios";
import { baseApi } from "..";

export const getProductManagement = async ({ clase, movimiento }) => {
  const response = axios.get(
    `${baseApi}/management/product-movement?clase=${clase}&movimiento=${movimiento}&p_iniddominio=1&p_inidsucursal=1`
  );
  return (await response).data;
};