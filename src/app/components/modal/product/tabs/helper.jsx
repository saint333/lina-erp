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
  setFormValue("type", "");
  const response = await fetchDataProduct(2, e.target.value);
  setValueSelect({
    ...valueSelect,
    type: response,
  });
};

export const handleType = async (
  e,
  setFormValue,
  setValueSelect,
  valueSelect
) => {
  setFormValue("brand", "");
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
  setFormValue("model", "");
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
  setFormValue("finish", "");
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
  setFormValue("capacity", "");
  const response = await fetchDataProduct(7, e.target.value);
  setValueSelect({
    ...valueSelect,
    capacity: response,
    finish,
  });
};
