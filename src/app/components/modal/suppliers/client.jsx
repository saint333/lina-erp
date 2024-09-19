import { useEffect, useState } from "react";
import ModalBasic from "..";
import {
  Box,
  FormControl,
  InputLabel,
  MenuItem,
  Select as Select2,
  Tab,
  Tabs,
  TextField,
} from "@mui/material";
import PersonIcon from "@mui/icons-material/Person";
import BusinessIcon from "@mui/icons-material/Business";
import Person from "./tabs/person";
import Company from "./tabs/company";
import { Controller, useForm } from "react-hook-form";
import DescriptionIcon from "@mui/icons-material/Description";
import RoomIcon from "@mui/icons-material/Room";
import { SupplierServices } from "src/app/services/maintenance/suppliers";
import { commonServices } from "src/app/services";
import { CancelButton, SaveButton } from "../../iu/button";
import CustomTabPanel, { a11yProps } from "../../tabs/tabs";
import { ubigeo } from "src/app/util/ubigeo";
import { SelectAsyncCustom } from "../../iu/select";
import { useSnackbar } from "notistack";

export default function ModalSuppliers({
  open,
  setOpen,
  title,
  setData,
  client,
  setClient,
}) {
  const [value, setValue] = useState(0);
  const [paises, setPaises] = useState([]);
  const [cliente, setCliente] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const { enqueueSnackbar } = useSnackbar();

  const defaultValues = {
    chruc: "",
    chnombrecomercial: "",
    chrazonsocial: "",
    chcorreo: "",
    chtelefono: "",
    chnombres: "",
    chdireccion: "",
    p_inidubigeo: "",
    p_inidpais: "",
    p_inidtipodocumento: "",
    chnrodocumento: "",
    chapellidopaterno: "",
    chapellidomaterno: "",
    chfechanacimiento: "",
    p_inidtiposexo: "",
    proceso: value === 0 ? "PERSONA" : "EMPRESA",
    p_inidempresa: null,
    p_inidpersona: 0,
    p_inidjurinat: value === 0 ? 1 : 2,
    p_inidproveedor: 0,
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
    reset,
    setValue: setFormValue,
  } = useForm({
    defaultValues,
  });

  const handleChange = (event, newValue) => {
    reset();
    setValue(newValue);
  };

  const onSubmit = async (data) => {
    const letterAccion = "I";
    const list = await SupplierServices({ data, letterAccion });
    console.log("🚀 ~ onSubmit ~ list:", list)
    if (typeof list.obj === "object") {
      setData((prev) => [...prev, list.obj]);
      enqueueSnackbar("Proveedor registrado correctamente", {
        variant: "success",
        style: { fontSize: "1.3rem" },
      });
    } 
    if(list.message) {
      enqueueSnackbar(
        `Error al ${letterAccion == "I" ? "insertar" : "actualizar"} proveedor`,
        {
          variant: "error",
          style: { fontSize: "1.3rem" },
        }
      );
    }
    handleClose();
  };

  const CustomInput = ({ label, textKey }) => (
    <Controller
      name={textKey}
      control={control}
      rules={{ required: "Este campo es requerido" }}
      render={({ field }) => (
        <TextField
          {...field}
          label={label}
          error={errors[textKey]}
          fullWidth
          size='small'
        />
      )}
    />
  );

  const CustomSelect = ({ label, textKey, handleChange, children }) => {
    return (
      <Controller
        name={textKey}
        control={control}
        render={({ field }) => (
          <FormControl fullWidth size='small'>
            <InputLabel id={`role-${textKey}-label`} error={errors[textKey]}>
              {label}
            </InputLabel>
            <Select2
              {...field}
              labelId={`role-${textKey}-label`}
              label={label}
              error={errors[textKey]}
              onChange={(e) => {
                field.onChange(e);
                handleChange && handleChange(e);
              }}
            >
              <MenuItem value='' disabled>
                -
              </MenuItem>
              {children}
            </Select2>
          </FormControl>
        )}
        rules={{ required: "Este campo es requerido" }}
      />
    );
  };

  const handleClose = () => {
    reset(defaultValues);
    setOpen(false);
    setInputValue(null);
    setClient(null);
  };

  useEffect(() => {
    const fetchData = async () => {
      const persona = await commonServices({ letterAccion: 15 });
      const pais = await commonServices({ letterAccion: 17 });
      setCliente(persona);
      setPaises(pais);
    };
    fetchData();
  }, []);

  useEffect(() => {
    if (client) {
      const ubigeoData = ubigeo.find(
        (item) => item.p_inidubigeo === client.p_inidubigeo
      );
      reset(client);
      setInputValue({
        value: client.p_inidubigeo,
        label: `${ubigeoData.chdepartamento} - ${ubigeoData.chprovincia} - ${ubigeoData.chdistrito}`,
      });
      if (client.p_inidjurinat == 1) {
        handleChange(null, 0);
      } else {
        handleChange(null, 1);
      }
    }
  }, [client, reset]);

  return (
    <ModalBasic
      open={open}
      handleClose={handleClose}
      title={title}
      actions={
        <div className='flex gap-10 justify-end'>
          <SaveButton text='Guardar' onClick={handleSubmit(onSubmit)} />
          <CancelButton text='Cancelar' onClick={handleClose} />
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
              label='Persona'
              icon={<PersonIcon />}
              iconPosition='start'
              className='!min-h-[50px]'
              {...a11yProps(0)}
            />
            <Tab
              label='Empresa'
              iconPosition='start'
              icon={<BusinessIcon />}
              className='!min-h-[50px]'
              {...a11yProps(1)}
            />
          </Tabs>
        </Box>
        <CustomTabPanel value={value} index={0}>
          <Person
            register={register}
            errors={errors}
            CustomInput={CustomInput}
            CustomSelect={CustomSelect}
            cliente={cliente}
          />
        </CustomTabPanel>
        <CustomTabPanel value={value} index={1}>
          <Company
            register={register}
            errors={errors}
            CustomInput={CustomInput}
            CustomSelect={CustomSelect}
          />
        </CustomTabPanel>
        <Box sx={{ pt: 2 }}>
          <fieldset
            style={{ border: "1px solid rgba(0, 0, 0, 0.23)", padding: "10px" }}
          >
            <legend>
              <DescriptionIcon color='primary' /> Datos Adicionales
            </legend>
            <div className='flex gap-10 flex-col md:flex-row'>
              <CustomInput label='Telefono' textKey='chtelefono' />
              <CustomInput label='Correo' textKey='chcorreo' />
            </div>
          </fieldset>
        </Box>
        <Box sx={{ pt: 2 }}>
          <fieldset
            style={{
              border: "1px solid rgba(0, 0, 0, 0.23)",
              padding: "10px",
              display: "flex",
              flexDirection: "column",
              gap: "12px",
            }}
          >
            <legend>
              <RoomIcon color='primary' /> Datos de dirección
            </legend>
            <CustomInput label='Direccion' textKey='chdireccion' />
            <SelectAsyncCustom
              options={ubigeo.map((item) => ({
                value: item.p_inidubigeo,
                label: `${item.chdepartamento} - ${item.chprovincia} - ${item.chdistrito}`,
              }))}
              placeholder='Ubigeo'
              handleChange={(e) => {
                setFormValue("p_inidubigeo", e.value);
                setInputValue(e);
              }}
              value={inputValue}
            />
            <CustomSelect
              label='Pais'
              textKey='p_inidpais'
              handleChange={() => {}}
            >
              {paises.map((item) => (
                <MenuItem
                  key={item.p_inidmaestrodetalle}
                  value={item.p_inidmaestrodetalle}
                >
                  {item.chmaestrodetalle}
                </MenuItem>
              ))}
            </CustomSelect>
          </fieldset>
        </Box>
      </Box>
    </ModalBasic>
  );
}
