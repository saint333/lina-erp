import { Controller, useForm } from "react-hook-form";
import ModalBasic from "..";
import { CancelButton, SaveButton } from "../../iu/button";
import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import { useEffect } from "react";
import { actionContact } from "src/app/services/whatsapp/contact";
import { useSnackbar } from "notistack";

export const ContactModal = ({ open, setOpen, title, data, setData }) => {
  const defaultValues = {
    chcountry: "",
    chnumber: "",
    chname: "",
    status: "",
  };

  const { enqueueSnackbar } = useSnackbar();

  const {
    handleSubmit,
    formState: { errors },
    control,
    reset,
    setValue,
  } = useForm({ defaultValues });

  const handleClose = () => {
    reset(defaultValues);
    setData(null);
    setOpen(false);
  };

  const onSubmit = async (dataForm) => {
    const response = await actionContact(dataForm, data ? "U" : "I");
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

  useEffect(() => {
    if (data) {
      reset(data);
    }
  }, [data]);

  return (
    <ModalBasic
      open={open}
      title={title}
      handleClose={handleClose}
      actions={
        <div className='flex gap-10 justify-end'>
          <SaveButton text='Guardar' onClick={handleSubmit(onSubmit)} />
          <CancelButton text='Cancelar' onClick={handleClose} />
        </div>
      }
    >
      <div className='grid grid-cols-1 gap-10 md:grid-cols-2 pt-3'>
        <CustomInput label='Codigo' textKey='chcountry' />
        <CustomInput label='Numero' textKey='chnumber' />
        <CustomInput label='Nombre' textKey='chname' />
        <CustomSelect label='Estado' textKey='status'>
          <MenuItem value={true}>Activo</MenuItem>
          <MenuItem value={false}>Desactivado</MenuItem>
        </CustomSelect>
      </div>
    </ModalBasic>
  );
};
