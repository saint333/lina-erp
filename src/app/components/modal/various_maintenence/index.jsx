import { Controller, useForm } from "react-hook-form";
import ModalBasic from "..";
import { AgregarButton, CancelButton, SaveButton } from "../../iu/button";
import { useEffect, useMemo, useState } from "react";
import { addMaster, commonServices } from "src/app/services";
import Table from "../../table";
import { TextField } from "@mui/material";

export default function ModalVarious({ open, setOpen, title, id }) {
  const defaultValues = {
    p_inidmaestrodetalle: null,
    p_inidmaestrocabecera: "",
    chcodigomaestrodetalle: "",
    chmaestrodetalle: "",
  };

  const [data, setData] = useState([]);

  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
    reset,
    setValue: setFormValue,
  } = useForm({
    defaultValues,
  });

  const handleClose = () => {
    reset(defaultValues);
    setOpen(false);
  };

  const onSubmit = async (data) => {
    console.log(data);
    data = { ...data, p_inidmaestrocabecera: id };
    const letterAccion = "I";
    const list = await addMaster({ data, letterAccion });
  };

  useEffect(() => {
    const fetchData = async () => {
      const product = await commonServices({letterAccion: id});
      setData(product);
    };
    fetchData();
  }, [id]);

  const columns = useMemo( () => [
    {
      accessorKey: "chmaestrodetalle",
      header: "DESCRIPCION",
      size: 150,
    }
  ])

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

  return (
    <ModalBasic
      open={open}
      handleClose={handleClose}
      title={title}
      actions={
        <div className='flex gap-10 justify-end'>
          <SaveButton text='Guardar' onClick={handleClose} />
          <CancelButton text='Cancelar' onClick={handleClose} />
        </div>
      }
    >
      <div className="mt-6 flex gap-10">
        <CustomInput label='DESCRIPCION' textKey='chmaestrodetalle' />
        <AgregarButton text='Agregar' onClick={handleSubmit(onSubmit)} />
      </div>
      <Table columns={columns} data={data} enableRowActions={false} />
    </ModalBasic>
  );
}
