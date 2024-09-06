import ModalBasic from "..";
import { Controller, useForm } from "react-hook-form";
import {
  Autocomplete,
  Card,
  CardContent,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import { useState } from "react";
import { CancelButton, SaveButton } from "../../iu/button";
import Table from "../../table";

export default function EntryModal({ open, setOpen, title }) {
  const [valueSelect, setValueSelect] = useState(null);

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

  const CustomSelect = ({ label, textKey, handleChange, children }) => {
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
                handleChange(e);
              }}
            >
              <MenuItem value='' disabled>-</MenuItem>
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
    >
      <div className='flex flex-col lg:flex-row gap-3'>
        <div className='flex-1'>
          <Card>
            <CardContent>
              <Autocomplete
                disablePortal
                id='controlled-demo'
                options={[]}
                value={valueSelect}
                onChange={(event, newValue) => {
                  setValueSelect(newValue);
                }}
                size='small'
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label='controlled'
                    variant='outlined'
                  />
                )}
              />
              <Table enableRowActions={false} />
            </CardContent>
          </Card>
        </div>
        <div className='flex-1'>
          <Card>
            <CardContent></CardContent>
          </Card>
        </div>
      </div>
    </ModalBasic>
  );
}
