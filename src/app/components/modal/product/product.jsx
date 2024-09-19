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
import { CancelButton, SaveButton } from "../../iu/button";
import CustomTabPanel, { a11yProps } from "../../tabs/tabs";
import { commonServices } from "src/app/services";

export default function ModalProduct({ open, setOpen, title }) {
  const [value, setValue] = useState(0);
  const [category, setCategory] = useState([]);
  const [caliber, setCaliber] = useState([]);
  const [extent, setExtent] = useState([]);

  const defaultValues = {
    category: "",
    code: "",
    p_inidtipo: "",
    p_inidmarca: "",
    p_inidmodelo: "",
    p_inidcalibre: "",
    p_inidacabado: "",
    p_inidcapacidad: "",
    chdescripcion: "",
    p_inidunidadmedida: "",
    p_inidsituacion: "",
    req_serie: false,
    paginaweb: false,
    destacado: false,

    p_inidproducto: 3165,
    chcodigoproducto: "ACCESORIO", //ENVIAR EL TEXTO DE LA CATEGORIA SOLO FUNCIONA PARA ACCION (I)
    chcodigoproductoantes: "",
    p_inidfamilia: 0,
    nucantporuni: 0,
    nustockminima: 0,
    nuprecio: 5,
    nuprecio2: 5,
    nuprecio3: 5,
    nuprecio4: 5,
    churl: "",
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
    reset,
    setValue: setFormValue,
    getValues,
  } = useForm({
    defaultValues,
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
      const [response, responseCaliber, responseExtent] = await Promise.all([
        fetchDataProduct(1, 0),
        fetchDataProduct(5, 0),
        commonServices({ letterAccion: 10 }),
      ]);
      setCategory(response);
      setCaliber(responseCaliber);
      setExtent(responseExtent);
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
            measure={extent}
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
