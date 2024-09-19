import {
  Checkbox,
  FormControl,
  FormControlLabel,
  FormGroup,
  InputLabel,
  MenuItem,
  Select,
  Skeleton,
  TextField,
} from "@mui/material";
import { useEffect, useState } from "react";
import { Controller } from "react-hook-form";
import { arrayData, handleCategory, handleModel, handleType } from "./helper";
import { SelectAsyncCustom } from "src/app/components/iu/select";
import { fetchDataProduct } from "src/app/services/maintenance/product";

export default function Service({
  register,
  errors,
  category,
  control,
  setFormValue,
  caliber,
  measure,
  product,
  reset,
}) {
  const [inputRequired, setInputRequired] = useState({
    p_inidtipo: true,
    chdescripcion: true,
    p_inidmarca: true,
    p_inidmodelo: true,
    p_inidcalibre: true,
  });
  const [valueSelect, setValueSelect] = useState({
    ...arrayData,
    caliber,
    category,
    measure,
  });
  const [brand, setBrand] = useState(null);

  useEffect(() => {
    setValueSelect((prev) => ({
      ...prev,
      caliber,
      category,
      measure,
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
              onChange={(e, child) => {
                field.onChange(e, child);
                handleChange(e, child);
              }}
            >
              <MenuItem value='0' disabled>
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

  useEffect(() => {
    const fetchData = async () => {
      if (product) {
        reset(product);
        setFormValue("code", product.chcodigoproducto);
        const type = await fetchDataProduct(2, product.p_inidfamilia);
        const response = await fetchDataProduct(3, product.p_inidtipo);
        const responseModel = await fetchDataProduct(4, product.p_inidtipo);
        const finish = await fetchDataProduct(6, product.p_inidmodelo);
        setFormValue("p_inidtipo", product.p_inidtipo);
        setFormValue("p_inidmarca", product.p_inidmarca);
        setFormValue("p_inidmodelo", product.p_inidmodelo);
        setFormValue("p_inidacabado", product.p_inidacabado);
        const brand = response.find(
          (item) => item.p_inidfamiliadetalle === product.p_inidmarca
        );
        setBrand({
          label: brand.chfamiliadetalle,
          value: brand.p_inidfamiliadetalle,
        });
        setValueSelect((prev) => ({
          ...prev,
          type,
          brand: response,
          model: responseModel,
          finish,
        }));
      }
    };
    fetchData();
  }, [product]);

  return (
    <div className='flex gap-10 flex-col'>
      <div className='flex flex-col gap-10 md:flex-row'>
        <CustomSelect
          label='Categoria'
          textKey='p_inidfamilia'
          required={true}
          handleChange={(e, child) => {
            if (e.target.value === 2) {
              setInputRequired((prev) => ({
                ...prev,
                p_inidtipo: true,
                chdescripcion: true,
                p_inidmarca: false,
                p_inidmodelo: false,
                p_inidcalibre: false,
              }));
            }
            if (e.target.value === 3 || e.target.value === 4) {
              setInputRequired((prev) => ({
                ...prev,
                p_inidtipo: true,
                chdescripcion: true,
                p_inidmarca: true,
                p_inidmodelo: true,
                p_inidcalibre: true,
              }));
            }
            setFormValue("chcodigoproducto", child.props.children);
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
          render={({ field }) => (
            <TextField
              {...field}
              label='Codigó'
              error={errors.code}
              fullWidth
              size='small'
              disabled
            />
          )}
        />
      </div>
      <div className='flex flex-col gap-10 md:flex-row'>
        <CustomSelect
          label='Tipo'
          textKey='p_inidtipo'
          required={inputRequired.p_inidtipo}
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
        <div className='w-full'>
          {valueSelect.brand.length != 0 ? (
            <SelectAsyncCustom
              placeholder='Marca'
              options={valueSelect.brand?.map((item) => ({
                label: item.chfamiliadetalle,
                value: item.p_inidfamiliadetalle,
              }))}
              handleChange={(e) => {
                setFormValue("p_inidmarca", e.value);
                setBrand(e);
              }}
              value={brand}
            />
          ) : (
            <Skeleton variant='rectangular' height={40} />
          )}
        </div>
      </div>
      <div className='flex flex-col gap-10 md:flex-row'>
        <CustomSelect
          label='Modelo'
          textKey='p_inidmodelo'
          required={inputRequired.p_inidmodelo}
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
          textKey='p_inidcalibre'
          required={inputRequired.p_inidcalibre}
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
          textKey='p_inidacabado'
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
          textKey='p_inidcapacidad'
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
        name='chdescripcion'
        control={control}
        rules={{ required: "Este campo es requerido" }}
        render={({ field }) => (
          <TextField
            {...field}
            label='Descripción'
            error={errors.chdescripcion}
            fullWidth
            size='small'
          />
        )}
      />
      <div className='flex flex-col gap-10 md:flex-row'>
        <CustomSelect
          label='Medida'
          textKey='p_inidunidadmedida'
          handleChange={() => {}}
          required={true}
        >
          {valueSelect.measure?.map((item, index) => (
            <MenuItem key={index} value={item.p_inidmaestrodetalle}>
              {item.chmaestrodetalle}
            </MenuItem>
          ))}
        </CustomSelect>
        <CustomSelect
          label='Situación'
          textKey='p_inidsituacion'
          handleChange={() => {}}
        >
          <MenuItem value={true}>Activo</MenuItem>
          <MenuItem value={false}>Desactivado</MenuItem>
        </CustomSelect>
      </div>
      <FormGroup className='!flex-row'>
        <FormControlLabel
          control={<Checkbox {...register("req_serie")} />}
          label='Requiere Serie'
        />
        <FormControlLabel
          control={<Checkbox {...register("paginaweb")} />}
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
