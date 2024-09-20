import ModalBasic from "..";
import { TextField } from "@mui/material";
import { Controller, useForm } from "react-hook-form";
import { CancelButton, SaveButton } from "../../iu/button";
import { crudDriver } from "src/app/services/administration/driver";
import { useSnackbar } from "notistack";
import { useEffect } from "react";

export default function ModalDriver({
  open,
  setOpen,
  title,
  rowData,
  setRowData,
}) {
  const { enqueueSnackbar } = useSnackbar();
  const defaultValues = {
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
  };

  const {
    handleSubmit,
    formState: { errors },
    control,
    reset,
    register,
  } = useForm({
    defaultValues,
  });

  const onSubmit = async (data) => {
    const accion = rowData ? "U" : "I";
    data = {
      ...data,
      chfechanacimiento: data.chfechanacimiento.split("-").reverse().join("-"),
    }
    const response = await crudDriver({ ...data, accion });
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
    reset();
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
            <TextField
              size='small'
              label='F. Nacimiento'
              type='date'
              variant='outlined'
              className='w-full'
              error={errors.chfechanacimiento}
              defaultValue={""}
              InputLabelProps={{ shrink: true }}
              {...register("chfechanacimiento", { required: true })}
              onChange={(e) => console.log(e.target.value)}
            />
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
