import { useEffect, useState } from "react";
import ModalBasic from "..";
import {
  Box,
  Checkbox,
  FormControl,
  FormControlLabel,
  FormGroup,
  FormLabel,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import { Controller, useForm } from "react-hook-form";
import { LicenseServices } from "src/app/services/maintenance/client";
import { commonServices } from "src/app/services";
import { CancelButton, SaveButton } from "../../button/button";

export default function ModalLicense({ open, setOpen, title }) {
  const [cliente, setCliente] = useState([]);
  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
    reset,
  } = useForm({
    defaultValues: {
      chlicencia: "",
      chfechavencimiento: "",
      p_inidcliente: "",
      p_inidlicencia: null,
      bodefenzapersonal: false,
      bocaza: false,
      bodeporte: false,
      boseguridaprivada: false,
      bosispe: false,
    },
  });

  const onSubmit = async (data) => {
    const letterAccion = "I";
    const response = await LicenseServices({ data, letterAccion });
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
        <div className='flex gap-2 justify-end'>
          <CancelButton text='Cancelar' onClick={handleClose} />
          <SaveButton text='Guardar' onClick={handleSubmit(onSubmit)} />
        </div>
      }
    >
      <Box
        sx={{ width: "100%" }}
        component={"form"}
        onSubmit={handleSubmit(onSubmit)}
        className='flex flex-col gap-3 mb-3'
      >
        <div className='flex flex-col gap-3 md:flex-row'>
          <TextField
            label='N° Licencia'
            variant='outlined'
            size='small'
            fullWidth
            error={errors.chlicencia}
            helperText={errors.chlicencia ? "Este campo es requerido" : null}
            {...register("chlicencia", { required: true })}
          />
          <TextField
            label='F. Vencimiento'
            variant='outlined'
            size='small'
            InputLabelProps={{ shrink: true }}
            fullWidth
            type='date'
            error={errors.chfechavencimiento}
            helperText={
              errors.chfechavencimiento ? "Este campo es requerido" : null
            }
            {...register("chfechavencimiento", { required: true })}
          />
        </div>
        <div>
          <FormLabel component='legend'>Modalidades</FormLabel>
          <FormGroup>
            <FormControlLabel
              control={<Checkbox {...register("bodefenzapersonal")} />}
              label='Defensa Personal'
            />
            <FormControlLabel
              control={<Checkbox {...register("bocaza")} />}
              label='Caza'
            />
            <FormControlLabel
              control={<Checkbox {...register("bodeporte")} />}
              label='Deporte'
            />
            <FormControlLabel
              control={<Checkbox {...register("boseguridaprivada")} />}
              label='Seguridad Privada'
            />
            <FormControlLabel
              control={<Checkbox {...register("bosispe")} />}
              label='Sispe'
            />
          </FormGroup>
        </div>
        <CustomSelect
          label='Tipo Cliente'
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
      </Box>
    </ModalBasic>
  );
}
