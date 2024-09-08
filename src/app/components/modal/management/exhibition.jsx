import { Controller, useForm } from "react-hook-form";
import ModalBasic from "..";
import { TextField } from "@mui/material";
import { CancelButton, SaveButton } from "../../iu/button";
import { Room } from "@mui/icons-material";

export const ExhibitionModal = ({ open, setOpen, title }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
    reset,
    setValue,
  } = useForm();

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
    setOpen(false);
  };

  const onSubmit = async (data) => {
    console.log(data);
  };

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
          <Room color='primary' /> Datos de producto
        </legend>
        <div className='flex flex-col md:flex-row gap-10'>
          <CustomInput label='Dirección' textKey='direccion' />
          <div className='hidden md:block w-full'></div>
        </div>
        <CustomInput label='Dirección' textKey='direccion' />
        <div className='flex flex-col md:flex-row gap-10'>
          <CustomInput label='Dirección' textKey='direccion' />
          <CustomInput label='Dirección' textKey='direccion' />
        </div>
      </fieldset>
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
          <Room color='primary' /> Datos de exhibicion
        </legend>
        <CustomInput label='Dirección' textKey='direccion' />
        <CustomInput label='Dirección' textKey='direccion' />
      </fieldset>
    </ModalBasic>
  );
};
