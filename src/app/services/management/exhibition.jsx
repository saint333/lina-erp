import axios from "axios";
import { baseApi } from "..";

export const getExhibition = async () => {
  const response = axios.get(
    `${baseApi}/management/series?sucursal=1`
  );
  return (await response).data;
};