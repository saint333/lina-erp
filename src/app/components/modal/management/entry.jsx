import ModalBasic from "..";
import { Controller, useForm } from "react-hook-form";
import {
  CardContent,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Skeleton,
  TextField,
} from "@mui/material";
import { useState } from "react";
import { CancelButton, SaveButton } from "../../iu/button";
import Table from "../../table";

export default function EntryModal({ open, setOpen, title }) {
  const [productSelect, setProductSelect] = useState([]);
  const [product, setProduct] = useState([]);

  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
    reset,
    setValue,
  } = useForm();

  const handleClose = () => {
    setOpen(false);
  };

  const onSubmit = async (data) => {
    console.log(data);
  };

  const CustomSelect = ({ label, textKey, handleChange = null, children }) => {
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
                handleChange && handleChange(e);
              }}
            >
              <MenuItem value='' disabled>
                -
              </MenuItem>
              {children}
            </Select>
          </FormControl>
        )}
        rules={{ required: "Este campo es requerido" }}
      />
    );
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
      className='lg:w-3/4'
    >
      <div className='flex flex-col lg:flex-row gap-3'>
        <div className='flex-1'>
          <CardContent>
            {product.length != 0 ? (
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
            <Table enableRowActions={false} />
          </CardContent>
        </div>
        <div className='flex-1'>
          <CardContent className="flex gap-10 flex-col">
            <CustomSelect label='Tipo Movimiento' textKey='modalidades'></CustomSelect>
            <div className="flex gap-10 flex-col md:flex-row">
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
              />
              <CustomInput label='N° Vale' textKey='vale' />
            </div>
            <CustomInput label='Observacion' textKey='observacion' />
            <CustomInput label='Autorizado' textKey='autorizado' />
          </CardContent>
        </div>
      </div>
    </ModalBasic>
  );
}
