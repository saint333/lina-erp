import { fetchDataProduct } from "src/app/services/maintenance/product";

export const arrayData = {
  category: [],
  type: [],
  brand: [],
  model: [],
  caliber: [],
  finish: [],
  capacity: [],
  measure: [],
  situation: [],
};

export const handleCategory = async (
  e,
  setFormValue,
  setValueSelect,
  valueSelect
) => {
  setFormValue("p_inidtipo", "0");
  setFormValue("p_inidmarca", "0");
  setFormValue("p_inidmodelo", "0");
  const response = await fetchDataProduct(2, e.target.value);
  setValueSelect({
    ...valueSelect,
    brand: [],
    model: [],
    type: response,
  });
};

export const handleType = async (
  e,
  setFormValue,
  setValueSelect,
  valueSelect
) => {
  setFormValue("p_inidmarca", "0");
  const response = await fetchDataProduct(3, e.target.value);
  await handleBrand(e, setFormValue, setValueSelect, valueSelect, response);
};

const handleBrand = async (
  e,
  setFormValue,
  setValueSelect,
  valueSelect,
  brand
) => {
  setFormValue("p_inidmodelo", "0");
  const response = await fetchDataProduct(4, e.target.value);
  setValueSelect({
    ...valueSelect,
    model: response,
    brand,
  });
};

export const handleModel = async (
  e,
  setFormValue,
  setValueSelect,
  valueSelect
) => {
  const finish = await handleCaliber(e, setFormValue);
  await handleFinish(e, setFormValue, setValueSelect, valueSelect, finish);
};

const handleCaliber = async (e, setFormValue) => {
  setFormValue("p_inidacabado", "0");
  const response = await fetchDataProduct(6, e.target.value);
  return response;
};

const handleFinish = async (
  e,
  setFormValue,
  setValueSelect,
  valueSelect,
  finish
) => {
  setFormValue("p_inidcapacidad", "0");
  const response = await fetchDataProduct(7, e.target.value);
  setValueSelect({
    ...valueSelect,
    capacity: response,
    finish,
  });
};
