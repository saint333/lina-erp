import ModalBasic from "..";
import { TextField } from "@mui/material";
import { Controller, useForm } from "react-hook-form";
import { CancelButton, SaveButton } from "../../button/button";
import { crudDriver } from "src/app/services/administration/driver";

export default function ModalDriver({ open, setOpen, title }) {
  const {
    handleSubmit,
    formState: { errors },
    control,
    reset,
  } = useForm({
    defaultValues: {
      p_inidconductor: 0,
      p_iniddominio: 1,
      p_inidtipodocumento: 57,
      chnrodocumento: "",
      chapellidopaterno: "",
      chapellidomaterno: "",
      chnombres: "",
      chfechanacimiento: "",
      chcategorabrebete: "",
      chnumerobrebete: "",
    },
  });

  const onSubmit = async (data) => {
    const accion = "I";
    const response = await crudDriver({ ...data, accion });
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

  const handleClose = () => {
    reset();
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
          <CancelButton text='Cancelar' onClick={handleClose} />
        </div>
      }
    >
      <div className='flex flex-col gap-10'>
      <fieldset
          style={{ border: "1px solid rgba(0, 0, 0, 0.23)", padding: "10px" }}
        >
          <legend>Datos Conductor</legend>
          <div className='flex gap-10 flex-col md:flex-row mb-10'>
            <CustomInput label='Apellido Paterno' textKey='chapellidopaterno' />
            <CustomInput label='Apellido Materno' textKey='chapellidomaterno' />
          </div>
          <CustomInput label='Nombres' textKey='chnombres' />
          <div className='flex gap-10 flex-col md:flex-row mt-10'>
            <CustomInput label='D.N.I' textKey='chnrodocumento' />
            <CustomInput label='F. Nacimiento' textKey='chfechanacimiento' />
          </div>
        </fieldset>
        <fieldset
          style={{ border: "1px solid rgba(0, 0, 0, 0.23)", padding: "10px" }}
        >
          <legend>Datos del Brebete</legend>
          <div className='flex gap-10 flex-col md:flex-row'>
            <CustomInput label='Categoria' textKey='chcategorabrebete' />
            <CustomInput label='Brebete' textKey='chnumerobrebete' />
          </div>
        </fieldset>
      </div>
    </ModalBasic>
  );
}
