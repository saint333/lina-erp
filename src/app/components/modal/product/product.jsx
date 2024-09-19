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
import { useSnackbar } from "notistack";
import { handleCategory } from "./tabs/helper";

export default function ModalProduct({ open, setOpen, title, product, setProduct, setData }) {
  const [value, setValue] = useState(0);
  const [category, setCategory] = useState([]);
  const [caliber, setCaliber] = useState([]);
  const [extent, setExtent] = useState([]);
  const { enqueueSnackbar } = useSnackbar();

  const defaultValues = {
    p_inidfamilia: 0,
    code: "",
    p_inidtipo: 0,
    p_inidmarca: 0,
    p_inidmodelo: 0,
    p_inidcalibre: 0,
    p_inidacabado: 0,
    p_inidcapacidad: 0,
    chdescripcion: "",
    p_inidunidadmedida: 37,
    p_inidsituacion: 0,
    req_serie: false,
    paginaweb: false,
    destacado: false,
    chcodigoproducto: "", //ENVIAR EL TEXTO DE LA CATEGORIA SOLO FUNCIONA PARA ACCION (I)
    p_inidproducto: null,
    chcodigoproductoantes: "",
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
    const letterAccion = product ? "U" : "I";
    const response = await ProductServices({
      data,
      letterAccion
    });
    console.log("🚀 ~ onSubmit ~ response:", response)
    if (typeof response.obj === "object") {
      setData((prev) => [...prev, response.obj]);
      enqueueSnackbar("Producto registrado correctamente", {
        variant: "success",
        style: { fontSize: "1.3rem" },
      });
    }
    if(response.message) {
      enqueueSnackbar(
        `Error al ${letterAccion == "I" ? "insertar" : "actualizar"} producto`,
        {
          variant: "error",
          style: { fontSize: "1.3rem" },
        }
      );
    }
    handleClose();
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

  const handleClose = () => {
    reset(defaultValues);
    setProduct(null);
    setOpen(false);
  };

  return (
    <ModalBasic
      open={open}
      handleClose={handleClose}
      title={title}
      actions={
        <div className='flex gap-6 justify-end'>
          <SaveButton text='Guardar' onClick={handleSubmit(onSubmit)} />
          <CancelButton
            text='Cancelar'
            onClick={handleClose}
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
            product={product}
            reset={reset}
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
