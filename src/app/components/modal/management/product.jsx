import { Controller, useForm } from "react-hook-form";
import ModalBasic from "..";
import { TextField } from "@mui/material";
import { CancelButton, SaveButton } from "../../iu/button";
import { Room } from "@mui/icons-material";
import Table from "../../table";
import { useMemo } from "react";

export const ProductModal = ({ open, setOpen, title }) => {
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

  const columns = useMemo(
    () => [
      {
        accessorKey: "chcodigoproveedor",
        header: "FECHA",
        size: 150,
      },
      {
        accessorKey: "razon",
        header: "TIPO DE MOVIMIENTO",
        size: 150,
      },
      {
        accessorKey: "chtipodocumento",
        header: "N° MOVIMIENTO",
        size: 200,
      },
      {
        accessorKey: "chnrodocumento",
        header: "INGRESO",
        size: 150,
      },
      {
        accessorKey: "chdireccion",
        header: "SALIDAS",
        size: 150,
      },
      {
        accessorKey: "saldo",
        header: "SALDO",
        size: 150,
      },
      {
        accessorKey: "ref1",
        header: "TIP. REF. #1",
        size: 150,
      },
      {
        accessorKey: "nom1",
        header: "NOM. REF. #1",
        size: 150,
      },
      {
        accessorKey: "ref2",
        header: "TIP. REF. #2",
        size: 150,
      },
      {
        accessorKey: "nom2",
        header: "NOM. REF. #2",
        size: 150,
      },
    ],
    []
  );

  return (
    <ModalBasic
      open={open}
      handleClose={handleClose}
      title={title}
      actions={
        <div className='flex gap-10 justify-end'>
          <CancelButton text='Cerrar' onClick={handleClose} />
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
          marginBottom: "20px",
        }}
      >
        <legend>
          <Room color='primary' /> Datos de producto
        </legend>
        <div className='flex flex-col md:flex-row gap-10'>
          <CustomInput label='Dirección' textKey='direccion' />
          <CustomInput label='Dirección' textKey='direccion' />
        </div>
        <div className='flex flex-col md:flex-row gap-10'>
          <CustomInput label='Dirección' textKey='direccion' />
          <div className='hidden md:block w-full'></div>
        </div>
      </fieldset>
      <Table columns={columns} enableRowActions={false}/>
    </ModalBasic>
  );
};
