import { Box, Tab, Tabs } from "@mui/material";
import { useEffect, useState } from "react";
import ModalBasic from "..";
import SettingsIcon from "@mui/icons-material/Settings";
import FilterAltIcon from "@mui/icons-material/FilterAlt";
import { useForm } from "react-hook-form";
import Service from "./tabs/services";
import Family from "./tabs/family";
import {
  fetchDataProduct,
  ProductServices,
} from "src/app/services/maintenance/product";
import { CancelButton, SaveButton } from "../../button/button";
import CustomTabPanel, { a11yProps } from "../../tabs/tabs";

export default function ModalProduct({ open, setOpen, title }) {
  const [value, setValue] = useState(0);
  const [category, setCategory] = useState([]);
  const [caliber, setCaliber] = useState([]);
  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
    reset,
    setValue: setFormValue,
    getValues,
  } = useForm({
    defaultValues: {
      category: "",
      code: "",
      type: "",
      brand: "",
      model: "",
      caliber: "",
      finish: "",
      capacity: "",
      description: "",
      measure: "",
      situation: "",
      requiredserie: false,
      web: false,
      destacado: false,
    },
  });

  const handleChange = (event, newValue) => {
    reset();
    setValue(newValue);
  };

  const onSubmit = async (data) => {
    const response = await ProductServices({
      data,
      accion: "POST",
      letterAccion: "I",
    });
  };

  useEffect(() => {
    const fecthData = async () => {
      const [response, responseCaliber] = await Promise.all([
        fetchDataProduct(1, 0),
        fetchDataProduct(5, 0),
      ]);
      setCategory(response);
      setCaliber(responseCaliber);
    };
    fecthData();
  }, []);

  return (
    <ModalBasic
      open={open}
      handleClose={() => {
        setOpen(false);
        reset();
      }}
      title={title}
      actions={
        <div className='flex gap-6 justify-end'>
          <SaveButton text='Guardar' onClick={handleSubmit(onSubmit)} />
          <CancelButton
            text='Cancelar'
            onClick={() => {
              setOpen(false);
              reset();
            }}
          />
        </div>
      }
    >
      <Box
        sx={{ width: "100%" }}
        component={"form"}
        onSubmit={handleSubmit(onSubmit)}
      >
        <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
          <Tabs
            value={value}
            onChange={handleChange}
            aria-label='basic tabs example'
          >
            <Tab
              label='Producto - Servicio'
              icon={<SettingsIcon />}
              iconPosition='start'
              className='!min-h-[50px]'
              {...a11yProps(0)}
            />
            <Tab
              label='Familias'
              iconPosition='start'
              icon={<FilterAltIcon />}
              className='!min-h-[50px]'
              {...a11yProps(1)}
            />
          </Tabs>
        </Box>
        <CustomTabPanel value={value} index={0}>
          <Service
            errors={errors}
            register={register}
            category={category}
            control={control}
            setFormValue={setFormValue}
            caliber={caliber}
          />
        </CustomTabPanel>
        <CustomTabPanel value={value} index={1}>
          <Family
            errors={errors}
            register={register}
            category={category}
            control={control}
            setFormValue={setFormValue}
            caliber={caliber}
            getValues={getValues}
          />
        </CustomTabPanel>
      </Box>
    </ModalBasic>
  );
}
