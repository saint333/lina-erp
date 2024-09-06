import ModalBasic from "..";
import {
  TextField,
} from "@mui/material";
import { Controller, useForm } from "react-hook-form";
import { CancelButton, SaveButton } from "../../iu/button";
import { crudVehicles } from "src/app/services/administration/vehicles";

export default function ModalVehicle({ open, setOpen, title }) {
  const {
    handleSubmit,
    formState: { errors },
    control,
    reset,
  } = useForm({
    defaultValues: {
      p_inidvehiculo: 0,
      p_iniddominio: 1,
      chmarca: "",
      chplaca: "",
    },
  });

  const onSubmit = async (data) => {
    const accion = "I";
    const response = await crudVehicles({ ...data, accion });
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
      <div className='flex flex-col md:flex-row gap-10'>
        <CustomInput label='Marca' textKey='chmarca' />
        <CustomInput label='Placa' textKey='chplaca' />
      </div>
    </ModalBasic>
  );
}
