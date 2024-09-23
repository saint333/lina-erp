import ModalBasic from "..";
import { Controller, useForm } from "react-hook-form";
import {
  CardContent,
  FormControl,
  InputLabel,
  ListItemIcon,
  ListItemText,
  MenuItem,
  Select,
  Skeleton,
  TextField,
} from "@mui/material";
import { useEffect, useMemo, useState } from "react";
import { CancelButton, SaveButton } from "../../iu/button";
import Table from "../../table";
import { Delete } from "@mui/icons-material";
import { productList } from "src/app/services/maintenance/product";
import { SelectAsyncCustom } from "../../iu/select";

export default function ExitModal({ open, setOpen, title }) {
  const [productSelect, setProductSelect] = useState([]);
  const [product, setProduct] = useState([]);
  const [data, setData] = useState([]);

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

  useEffect(() => {
    const fetchData = async () => {
      const response = await productList();
      setProduct(response);
    };
    fetchData();
  }, []);

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

  const columns = useMemo(
    () => [
      {
        accessorKey: "chdescripcion",
        header: "PRODUCTO",
        size: 260,
        accessorFn: (row) => row.chcodigoproducto + " " + row.chdescripcion,
        enableEditing: false,
      },
      {
        accessorKey: "nvcantidad",
        header: "CANTIDAD",
        size: 40,
        muiEditTextFieldProps: ({ cell, row }) => ({
          onBlur: (e) => {
            const newData = data.map((item) => {
              if (item.p_inidproducto === row.original.p_inidproducto) {
                return {
                  ...item,
                  nvcantidad: e.target.value,
                };
              }
              return item;
            });
            setData(newData);
          },
        }),
      },
    ],
    [data]
  );

  const renderRowActions = ({ closeMenu, row }) => [
    <MenuItem
      onClick={() => {
        closeMenu();
        setData((prev) =>
          prev.filter(
            (item) => item.p_inidproducto !== row.original.p_inidproducto
          )
        );
      }}
      key={0}
    >
      <ListItemIcon>
        <Delete fontSize='small' />
      </ListItemIcon>
      <ListItemText>Eliminar</ListItemText>
    </MenuItem>,
  ];

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
      className='lg:!w-3/4'
    >
      <div className='flex flex-col lg:flex-row gap-3'>
        <div className='lg:w-8/12'>
          <CardContent>
            {product.length != 0 ? (
              <SelectAsyncCustom
                options={product.map((item) => ({
                  value: item.p_inidproducto,
                  label: `${item.chcodigoproducto} - ${item.chdescripcion}`,
                }))}
                placeholder='Cliente'
                handleChange={(e) => {
                  setValue("p_inidcliente", e.value);
                  setProductSelect(null);
                  setData((prev) => [
                    ...prev,
                    product.find((item) => item.p_inidproducto === e.value),
                  ]);
                }}
                value={productSelect}
              />
            ) : (
              <Skeleton variant='rectangular' height={40} />
            )}
            <Table
              data={data}
              columns={columns}
              pageSize={5}
              renderRowActionMenuItems={renderRowActions}
              editDisplayMode='cell'
              enableEditing={true}
            />
          </CardContent>
        </div>
        <div className='lg:w-4/12'>
          <CardContent className='flex gap-10 flex-col'>
            <CustomSelect
              label='Tipo Movimiento'
              textKey='modalidades'
            ></CustomSelect>
            <div className='flex gap-10 flex-col md:flex-row'>
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
