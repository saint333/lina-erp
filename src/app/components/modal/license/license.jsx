import { useEffect, useState } from "react";
import ModalBasic from "..";
import {
  Box,
  Checkbox,
  FormControlLabel,
  FormGroup,
  FormLabel,
  TextField,
} from "@mui/material";
import { useForm } from "react-hook-form";
import { LicenseServices, List } from "src/app/services/maintenance/client";
import { CancelButton, SaveButton } from "../../iu/button";
import { SelectAsyncCustom } from "../../iu/select";

export default function ModalLicense({ open, setOpen, title }) {
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

  const handleClose = () => {
    reset();
    setOpen(false);
  };

  useEffect(() => {
    const fetchData = async () => {
      const persona = await List();
      setCliente(persona);
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
      <Box
        sx={{ width: "100%" }}
        component={"form"}
        onSubmit={handleSubmit(onSubmit)}
        className='flex flex-col gap-10 mb-3'
      >
        <div className='flex flex-col gap-10 md:flex-row'>
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
        <SelectAsyncCustom
          options={cliente.map((item) => ({
            value: item.p_inidcliente,
            label: `${item.razon} - ${item.chcodigocliente}`,
          }))}
          placeholder='Cliente'
          handleChange={(e) => setValue("p_inidcliente", e.value)}
        />
      </Box>
    </ModalBasic>
  );
}
