import { useEffect, useState } from "react";
import ModalBasic from "..";
import { Skeleton, TextField } from "@mui/material";
import { useForm } from "react-hook-form";
import { List, ResolucionServices } from "src/app/services/maintenance/client";
import { CancelButton, SaveButton } from "../../iu/button";
import { SelectAsyncCustom } from "../../iu/select";

export default function ModalResolution({ open, setOpen, title }) {
  const [cliente, setCliente] = useState([]);
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
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
          {cliente.length != 0 ? (
            <SelectAsyncCustom
              options={cliente.map((item) => ({
                value: item.p_inidcliente,
                label: `${item.razon} - ${item.chcodigocliente}`,
              }))}
              placeholder='Cliente'
              handleChange={(e) => setValue("p_inidcliente", e.value)}
            />
          ) : (
            <Skeleton variant='rectangular' height={40} />
          )}
        </fieldset>
      </div>
    </ModalBasic>
  );
}
