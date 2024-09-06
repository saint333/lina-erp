import React, { useEffect, useState } from "react";
import ModalBasic from "..";
import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import { Controller, useForm } from "react-hook-form";
import { ResolucionServices } from "src/app/services/maintenance/client";
import { commonServices } from "src/app/services";
import { CancelButton, SaveButton } from "../../iu/button";

export default function ModalResolution({ open, setOpen, title }) {
  const [cliente, setCliente] = useState([]);
  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
    reset,
  } = useForm({
    defaultValues: {
      chresolucion: "",
      chfechavencimiento: "",
      p_inidcliente: "",
      p_inidresolucion: null,
    },
  });

  const onSubmit = async (data) => {
    const letterAccion = "I";
    const response = await ResolucionServices({ data, letterAccion });
    handleClose();
  };

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
                handleChange(e);
              }}
            >
              <MenuItem value='' disabled>-</MenuItem>
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
    const fetchData = async () => {
      const persona = await commonServices({ letterAccion: 12 });
      const empresa = await commonServices({ letterAccion: 13 });
      setCliente([...persona, ...empresa]);
    };
    fetchData();
  }, []);

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
      <div className='flex flex-col gap-10'>
        <fieldset
          style={{ border: "1px solid rgba(0, 0, 0, 0.23)", padding: "10px" }}
        >
          <legend>Datos de la Resolución</legend>
          <div className='flex gap-10 flex-col md:flex-row'>
            <TextField
              label='N° Resolución'
              variant='outlined'
              size='small'
              fullWidth
              error={errors.chresolucion}
              helperText={
                errors.chresolucion ? "Este campo es requerido" : null
              }
              {...register("chresolucion", { required: true })}
            />
            <TextField
              label='F. Vencimiento'
              variant='outlined'
              size='small'
              fullWidth
              InputLabelProps={{ shrink: true }}
              error={errors.chfechavencimiento}
              type='date'
              helperText={
                errors.chfechavencimiento ? "Este campo es requerido" : null
              }
              {...register("chfechavencimiento", { required: true })}
            />
          </div>
        </fieldset>
        <fieldset
          style={{ border: "1px solid rgba(0, 0, 0, 0.23)", padding: "10px" }}
        >
          <legend>Datos del Cliente</legend>
          <CustomSelect
            label='Cliente'
            textKey='p_inidcliente'
            handleChange={() => null}
          >
            {cliente.map((item) => (
              <MenuItem
                key={item.p_inidmaestrodetalle}
                value={item.p_inidmaestrodetalle}
              >
                {item.chmaestrodetalle}
              </MenuItem>
            ))}
          </CustomSelect>
        </fieldset>
      </div>
    </ModalBasic>
  );
}
