import { useEffect, useState } from "react";
import ModalBasic from "..";
import {
  Autocomplete,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import { Controller, useForm } from "react-hook-form";
import { commonServices } from "src/app/services";
import { CancelButton, SaveButton } from "../../button/button";
import { Room } from "@mui/icons-material";
import { ubigeo } from "src/app/util/ubigeo";
import { crudCarrier } from "src/app/services/administration/carrier";

export default function ModalCarrier({ open, setOpen, title }) {
  const [inputValue, setInputValue] = useState("");
  const [paises, setPaises] = useState([]);

  const {
    handleSubmit,
    formState: { errors },
    control,
    reset,
    setValue,
  } = useForm({
    defaultValues: {
      p_inidtransportista: 0,
      p_iniddominio: 1,
      chrazonsocial: "",
      chruc: "",
      chtelefono: "",
      chdirecfiscal: "",
      p_inidubigeo: "",
      p_inidpais: ""
    },
  });

  const onSubmit = async (data) => {
    const accion = "I";
    const response = await crudCarrier({ ...data, accion });
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
                handleChange && handleChange(e);
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

  const handleClose = () => {
    reset();
    setOpen(false);
  };

  useEffect(() => {
    const fetchData = async () => {
      const pais = await commonServices({ letterAccion: 17 });
      setPaises(pais);
    };
    fetchData();
  }, []);

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
          <legend>Datos de la Tarjeta</legend>
          <div className='flex gap-10 flex-col md:flex-row mb-10'>
            <CustomInput label='RUC' textKey='chruc' />
            <CustomInput label='Telefono' textKey='chtelefono' />
          </div>
          <CustomInput label='Razon Social' textKey='chrazonsocial' />
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
            <Room color='primary' /> Datos de dirección
          </legend>
          <CustomInput label='Direccion' textKey='chdirecfiscal' />
          <Autocomplete
            freeSolo
            id='free-solo-2-demo'
            disableClearable
            value={
              ubigeo.find((option) => option.p_inidubigeo === inputValue) ||
              null
            }
            onChange={(event, newValue) => {
              setInputValue(newValue.p_inidubigeo);
              setValue("p_inidubigeo", newValue.p_inidubigeo);
            }}
            options={ubigeo}
            getOptionLabel={(option) =>
              option.chdepartamento +
              " - " +
              option.chprovincia +
              " - " +
              option.chdistrito
            }
            size='small'
            renderInput={(params) => (
              <TextField
                {...params}
                label='Ubigeo'
                InputProps={{
                  ...params.InputProps,
                  type: "search",
                }}
                error={errors.p_inidubigeo}
                InputLabelProps={{ error: errors.p_inidubigeo }}
              />
            )}
          />
          <CustomSelect
            label='Pais'
            textKey='p_inidpais'
            handleChange={() => {}}
          >
            {paises.map((item) => (
              <MenuItem
                key={item.p_inidmaestrodetalle}
                value={item.p_inidmaestrodetalle}
              >
                {item.chmaestrodetalle}
              </MenuItem>
            ))}
          </CustomSelect>
        </fieldset>
      </div>
    </ModalBasic>
  );
}
