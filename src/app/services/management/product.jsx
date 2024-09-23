import axios from "axios";
import { baseApi } from "..";

export const getProductManagement = async () => {
  const response = axios.get(
    `${baseApi}/management/warehouse-balance?p_iniddominio=1&p_inidsucursal=1`
  );
  return (await response).data;
};

export const getWarehouseBalanceDetail = async (id) => {
  const response = axios.get(
    `${baseApi}/management/warehouse-balance/detail?p_iniddominio=1&p_inidsucursal=1&p_inidproducto=${id}`
  );
  return (await response).data;
}