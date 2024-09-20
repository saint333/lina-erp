import ModalBasic from "..";
import { TextField } from "@mui/material";
import { Controller, useForm } from "react-hook-form";
import { CancelButton, SaveButton } from "../../iu/button";
import { crudVehicles } from "src/app/services/administration/vehicles";
import { useEffect } from "react";
import { useSnackbar } from "notistack";

export default function ModalVehicle({
  open,
  setOpen,
  title,
  rowData,
  setRowData,
}) {
  const defaultValues = {
    p_inidvehiculo: 0,
    p_iniddominio: 1,
    chmarca: "",
    chplaca: "",
  };
  const { enqueueSnackbar } = useSnackbar();

  const {
    handleSubmit,
    formState: { errors },
    control,
    reset,
  } = useForm({
    defaultValues,
  });

  const onSubmit = async (data) => {
    const accion = rowData ? "U" : "I";
    const response = await crudVehicles({ ...data, accion });
    console.log("🚀 ~ onSubmit ~ data:", response);
    if (response.codigo == 1) {
      enqueueSnackbar(response.valor, {
        variant: "success",
        style: { fontSize: "1.3rem" },
      });
    } else {
      enqueueSnackbar(response.valor, {
        variant: "error",
        style: { fontSize: "1.3rem" },
      });
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

  const handleClose = () => {
    reset(defaultValues);
    setRowData(null);
    setOpen(false);
  };

  useEffect(() => {
    if (rowData) {
      reset(rowData);
    }
  }, [rowData]);

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
