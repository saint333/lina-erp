import {
  Checkbox,
  FormControl,
  FormControlLabel,
  FormGroup,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import { useEffect, useState } from "react";
import { Controller } from "react-hook-form";
import { arrayData, handleCategory, handleModel, handleType } from "./helper";

export default function Service({
  register,
  errors,
  category,
  control,
  setFormValue,
  caliber,
  measure,
}) {
  const [inputRequired, setInputRequired] = useState({
    type: true,
    description: true,
    brand: true,
    model: true,
    caliber: true,
  });
  const [valueSelect, setValueSelect] = useState({
    ...arrayData,
    caliber,
    category,
    measure
  });

  useEffect(() => {
    setValueSelect((prev) => ({
      ...prev,
      caliber,
      category,
      measure
    }));
  }, [caliber, category, measure]);

  const CustomSelect = ({
    label,
    textKey,
    handleChange,
    children,
    required,
  }) => {
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
              <MenuItem value='' disabled>
                -
              </MenuItem>
              {children}
            </Select>
          </FormControl>
        )}
        rules={{ required: required }}
      />
    );
  };

  return (
    <div className='flex gap-10 flex-col'>
      <div className='flex flex-col gap-10 md:flex-row'>
        <CustomSelect
          label='Categoria'
          textKey='category'
          required={true}
          handleChange={(e) => {
            if (e.target.value === 2) {
              setInputRequired((prev) => ({
                ...prev,
                type: true,
                description: true,
                brand: false,
                model: false,
                caliber: false,
              }));
            }
            if (e.target.value === 3 || e.target.value === 4) {
              setInputRequired((prev) => ({
                ...prev,
                type: true,
                description: true,
                brand: true,
                model: true,
                caliber: true,
              }));
            }
            handleCategory(e, setFormValue, setValueSelect, valueSelect);
          }}
        >
          {valueSelect.category.map((item, index) => (
            <MenuItem key={index} value={item.p_inidfamiliadetalle}>
              {item.chfamiliadetalle}
            </MenuItem>
          ))}
        </CustomSelect>
        <Controller
          name='code'
          control={control}
          rules={{ required: "Este campo es requerido" }}
          render={({ field }) => (
            <TextField
              {...field}
              label='Codigó'
              error={errors.code}
              fullWidth
              size='small'
            />
          )}
        />
      </div>
      <div className='flex flex-col gap-10 md:flex-row'>
        <CustomSelect
          label='Tipo'
          textKey='type'
          required={inputRequired.type}
          handleChange={(e) =>
            handleType(e, setFormValue, setValueSelect, valueSelect)
          }
        >
          {valueSelect.type?.map((item, index) => (
            <MenuItem key={index} value={item.p_inidfamiliadetalle}>
              {item.chfamiliadetalle}
            </MenuItem>
          ))}
        </CustomSelect>
        <CustomSelect
          label='Marca'
          textKey='brand'
          handleChange={() => null}
          required={inputRequired.brand}
        >
          {valueSelect.brand?.map((item, index) => (
            <MenuItem key={index} value={item.p_inidfamiliadetalle}>
              {item.chfamiliadetalle}
            </MenuItem>
          ))}
        </CustomSelect>
      </div>
      <div className='flex flex-col gap-10 md:flex-row'>
        <CustomSelect
          label='Modelo'
          textKey='model'
          required={inputRequired.model}
          handleChange={(e) =>
            handleModel(e, setFormValue, setValueSelect, valueSelect)
          }
        >
          {valueSelect.model?.map((item, index) => (
            <MenuItem key={index} value={item.p_inidfamiliadetalle}>
              {item.chfamiliadetalle}
            </MenuItem>
          ))}
        </CustomSelect>
        <CustomSelect
          label='Calibre'
          textKey='caliber'
          required={inputRequired.caliber}
          handleChange={() => null}
        >
          {valueSelect.caliber?.map((item, index) => (
            <MenuItem key={index} value={item.p_inidfamiliadetalle}>
              {item.chfamiliadetalle}
            </MenuItem>
          ))}
        </CustomSelect>
      </div>
      <div className='flex flex-col gap-10 md:flex-row'>
        <CustomSelect
          label='Acabado'
          textKey='finish'
          handleChange={() => null}
        >
          {valueSelect.finish?.map((item, index) => (
            <MenuItem key={index} value={item.p_inidfamiliadetalle}>
              {item.chfamiliadetalle}
            </MenuItem>
          ))}
        </CustomSelect>
        <CustomSelect
          label='Capacidad'
          textKey='capacity'
          handleChange={() => null}
        >
          {valueSelect.capacity?.map((item, index) => (
            <MenuItem key={index} value={item.p_inidfamiliadetalle}>
              {item.chfamiliadetalle}
            </MenuItem>
          ))}
        </CustomSelect>
      </div>
      <Controller
        name='description'
        control={control}
        rules={{ required: "Este campo es requerido" }}
        render={({ field }) => (
          <TextField
            {...field}
            label='Descripción'
            error={errors.description}
            fullWidth
            size='small'
          />
        )}
      />
      <div className='flex flex-col gap-10 md:flex-row'>
        <CustomSelect label='Medida' textKey='measure' handleChange={() => {}}>
          {valueSelect.measure?.map((item, index) => (
            <MenuItem key={index} value={item.p_inidmaestrodetalle}>
              {item.chmaestrodetalle}
            </MenuItem>
          ))}
        </CustomSelect>
        <CustomSelect label='Situación' textKey='situation' handleChange={() => {}}>
          {valueSelect.situation?.map((item, index) => (
            <MenuItem key={index} value={item.p_inidfamiliadetalle}>
              {item.chfamiliadetalle}
            </MenuItem>
          ))}
        </CustomSelect>
      </div>
      <FormGroup className='!flex-row'>
        <FormControlLabel
          control={<Checkbox {...register("requiredserie")} />}
          label='Requiere Serie'
        />
        <FormControlLabel
          control={<Checkbox {...register("web")} />}
          label='Pagina Web'
        />
        <FormControlLabel
          control={<Checkbox {...register("destacado")} />}
          label='Destacado'
        />
      </FormGroup>
    </div>
  );
}
