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
import { CancelButton, SaveButton } from "../../iu/button";
import { Room } from "@mui/icons-material";
import { ubigeo } from "src/app/util/ubigeo";
import { crudCarrier } from "src/app/services/administration/carrier";
import { SelectAsyncCustom } from "../../iu/select";
import { useSnackbar } from "notistack";

export default function ModalCarrier({ open, setOpen, title, rowData, setRowData }) {
  const [inputValue, setInputValue] = useState("");
  const [paises, setPaises] = useState([]);
  const { enqueueSnackbar } = useSnackbar();

  const defaultValues= {
    p_inidtransportista: 0,
    p_iniddominio: 1,
    chrazonsocial: "",
    chruc: "",
    chtelefono: "",
    chdirecfiscal: "",
    p_inidubigeo: "",
    p_inidpais: ""
  }

  const {
    handleSubmit,
    formState: { errors },
    control,
    reset,
    setValue,
  } = useForm({
    defaultValues
  });

  const onSubmit = async (data) => {
    const accion = rowData ? "U" : "I";
    const response = await crudCarrier({ ...data, accion });
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
    reset(defaultValues);
    setRowData(null);
    setOpen(false);
  };

  useEffect(() => {
    const fetchData = async () => {
      const pais = await commonServices({ letterAccion: 17 });
      setPaises(pais);
    };
    fetchData();
  }, []);

  useEffect(() => {
    if (rowData) {
      const ubigeoData = ubigeo.find(
        (item) => item.p_inidubigeo === rowData.p_inidubigeo
      );
      reset(rowData);
      setInputValue({
        value: rowData.p_inidubigeo,
        label: `${ubigeoData.chdepartamento} - ${ubigeoData.chprovincia} - ${ubigeoData.chdistrito}`,
      });
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
          <SelectAsyncCustom
              options={ubigeo.map((item) => ({
                value: item.p_inidubigeo,
                label: `${item.chdepartamento} - ${item.chprovincia} - ${item.chdistrito}`,
              }))}
              placeholder='Ubigeo'
              handleChange={(e) => {
                setValue("p_inidubigeo", e.value);
                setInputValue(e);
              }}
              value={inputValue}
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
