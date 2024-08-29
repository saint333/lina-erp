import { useEffect, useState } from "react";
import ModalBasic from "..";
import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import { Controller, useForm } from "react-hook-form";
import { CardServices, List } from "src/app/services/maintenance/client";
import { commonServices } from "src/app/services";
import { CancelButton, SaveButton } from "../../button/button";

export default function ModalCard({ open, setOpen, title }) {
  const [modalidad, setModalidad] = useState([]);
  const [cliente, setCliente] = useState([]);
  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
    reset,
    setValue,
  } = useForm({
    defaultValues: {
      chtarjeta: "",
      modalidad: "",
      chtipo: "",
      chmarca: "",
      chserie: "",
      chmodelo: "",
      chcalibre: "",
      p_inidcliente: "",
      p_inidmodalidad: "",
      p_inidtarjeta: null,
    },
  });

  const onSubmit = async (data) => {
    const letterAccion = "I";
    const response = await CardServices({ data, letterAccion });
    console.log("🚀 ~ onSubmit ~ data:", response);
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
            <Select
              {...field}
              labelId={`role-${textKey}-label`}
              label={label}
              error={errors[textKey]}
              onChange={(e) => {
                field.onChange(e);
                handleChange && handleChange(e);
              }}
            >
              <MenuItem value=''>-</MenuItem>
              {children}
            </Select>
          </FormControl>
        )}
        rules={{ required: "Este campo es requerido" }}
      />
    );
  };

  const handleClose = () => {
    reset();
    setOpen(false);
  };

  useEffect(() => {
    const fetchModalidad = async () => {
      const data = await commonServices({ letterAccion: 14 });
      const persona = await List();
      setModalidad(data);
      setCliente(persona);
    };
    fetchModalidad();
  }, []);

  return (
    <ModalBasic
      open={open}
      handleClose={handleClose}
      title={title}
      actions={
        <div className='flex gap-6 justify-end'>
          <SaveButton text='Guardar' onClick={handleSubmit(onSubmit)} />
          <CancelButton text='Cancelar' onClick={handleClose} />
        </div>
      }
    >
      <div className='flex flex-col gap-10'>
        <fieldset
          style={{ border: "1px solid rgba(0, 0, 0, 0.23)", padding: "10px" }}
        >
          <legend>Datos de la Tarjeta</legend>
          <div className='flex gap-10 flex-col md:flex-row'>
            <CustomInput label='N° Tarjeta' textKey='chtarjeta' />
            <CustomSelect
              label='Modalidad'
              textKey='modalidad'
              handleChange={(e) => {
                setValue(
                  "p_inidmodalidad",
                  modalidad.find(
                    (item) => item.chmaestrodetalle === e.target.value
                  ).p_inidmaestrodetalle
                );
              }}
            >
              {modalidad.map((item) => (
                <MenuItem
                  key={item.p_inidmaestrodetalle}
                  value={item.chmaestrodetalle}
                >
                  {item.chmaestrodetalle}
                </MenuItem>
              ))}
            </CustomSelect>
          </div>
        </fieldset>
        <fieldset
          style={{ border: "1px solid rgba(0, 0, 0, 0.23)", padding: "10px" }}
          className='flex flex-col gap-10'
        >
          <legend>Datos del Arma</legend>
          <div className='flex gap-10 flex-col md:flex-row'>
            <CustomInput label='Tipo' textKey='chtipo' />
            <CustomInput label='Modelo' textKey='chmodelo' />
          </div>
          <div className='flex gap-10 flex-col md:flex-row'>
            <CustomInput label='Marca' textKey='chmarca' />
            <CustomInput label='Calibre' textKey='chcalibre' />
          </div>
          <div className='flex gap-10 flex-col md:flex-row'>
            <CustomInput label='Serie' textKey='chserie' />
            <div className='hidden md:block w-full'></div>
          </div>
        </fieldset>
        <fieldset
          style={{ border: "1px solid rgba(0, 0, 0, 0.23)", padding: "10px" }}
        >
          <legend>Datos del Cliente</legend>
          <CustomSelect label='Cliente' textKey='p_inidcliente'>
            {cliente.map((item) => (
              <MenuItem
                key={item.p_inidcliente}
                value={item.p_inidcliente}
              >
                {item.razon} - {item.chcodigocliente}
              </MenuItem>
            ))}
          </CustomSelect>
        </fieldset>
      </div>
    </ModalBasic>
  );
}
