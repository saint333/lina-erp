import { useEffect, useMemo, useState } from "react";
import Table from "../table";
import { SendButton } from "../iu/button";
import {
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import { getContact } from "src/app/services/whatsapp/contact";
import { Controller, useForm } from "react-hook-form";
import { getBots } from "src/app/services/whatsapp/bots";
import { CloudUpload } from "@mui/icons-material";
import { styled } from "@mui/material/styles";

const VisuallyHiddenInput = styled("input")({
  clip: "rect(0 0 0 0)",
  clipPath: "inset(50%)",
  height: 1,
  overflow: "hidden",
  position: "absolute",
  bottom: 0,
  left: 0,
  whiteSpace: "nowrap",
  width: 1,
});

export const WhastappTable = () => {
  const [data, setData] = useState([]);
  const [selectedRow, setSelectedRow] = useState({});
  const [bots, setBots] = useState([]);
  const [file, setFile] = useState(null);

  const defaultValues = {
    to: "",
    message: "",
    type: "",
    bot: "",
  };

  const {
    handleSubmit,
    formState: { errors },
    control,
    reset,
    setValue,
    watch,
  } = useForm({ defaultValues });

  const type = watch("type");

  useEffect(() => {
    const fetchData = async () => {
      const product = await getContact();
      setData(product);
      const response = await getBots();
      setBots(response.filter((bot) => bot.actived === true));
    };
    fetchData();
  }, []);

  const columns = useMemo(
    () => [
      {
        accessorKey: "chcountry",
        header: "CODIGO",
        size: 150,
      },
      {
        accessorKey: "chnumber",
        header: "NUMERO",
        size: 150,
      },
      {
        accessorKey: "chname",
        header: "NOMBRE",
        size: 200,
      },
    ],
    []
  );

  const CustomSelect = ({
    label,
    textKey,
    handleChange = null,
    disabled,
    children,
  }) => {
    return (
      <Controller
        name={textKey}
        control={control}
        render={({ field }) => (
          <FormControl fullWidth size='small' disabled={disabled}>
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

  const CustomInput = ({ label, textKey, disabled }) => (
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
          disabled={disabled}
        />
      )}
    />
  );

  const onSubmit = async (data) => {
    console.log(data);
  };

  return (
    <div className='flex gap-7 items-start'>
      <div className='md:w-8/12 grid'>
        <Table
          enableRowSelection={true}
          columns={columns}
          data={data}
          loading={data.length === 0}
          onRowSelectionChange={setSelectedRow}
          rowSelection={selectedRow}
          enableRowActions={null}
        />
      </div>
      <div className='md:w-4/12'>
        <div className='flex gap-6 flex-col'>
          <CustomSelect
            label='Bot'
            textKey='bot'
            // disabled={bots.length == 0}
          >
            {bots.map((bot) => (
              <MenuItem key={bot.p_inidbot} value={bot.p_inidbot}>
                {bot.chname}
              </MenuItem>
            ))}
          </CustomSelect>
          <CustomSelect
            label='Tipo'
            textKey='type'
            // disabled={bots.length == 0}
            handleChange={(e) => setFile(null)}
          >
            <MenuItem value='text'>Texto</MenuItem>
            <MenuItem value='imagen'>Imagen</MenuItem>
            <MenuItem value='video'>Video</MenuItem>
            <MenuItem value='pdf'>PDF</MenuItem>
          </CustomSelect>
          {type === "text" && <CustomInput label='Mensaje' textKey='message' />}
          {type === "imagen" && (
            <Button
              component='label'
              role={undefined}
              variant='contained'
              tabIndex={-1}
              startIcon={<CloudUpload />}
            >
              {file ? file.name : "Subir Imagen"}
              <VisuallyHiddenInput
                type='file'
                onChange={(event) => setFile(event.target.files[0])}
                accept='image/*'
              />
            </Button>
          )}
          {type === "video" && (
            <Button
              component='label'
              role={undefined}
              variant='contained'
              tabIndex={-1}
              startIcon={<CloudUpload />}
            >
              {file ? file.name : "Subir video"}
              <VisuallyHiddenInput
                type='file'
                onChange={(event) => setFile(event.target.files[0])}
                accept='video/*'
              />
            </Button>
          )}
          {type === "pdf" && (
            <Button
              component='label'
              role={undefined}
              variant='contained'
              tabIndex={-1}
              startIcon={<CloudUpload />}
            >
              {file ? file.name : "Subir PDF"}
              <VisuallyHiddenInput
                type='file'
                onChange={(event) => setFile(event.target.files[0])}
                accept='application/pdf'
              />
            </Button>
          )}
          <SendButton text='Enviar' onClick={handleSubmit(onSubmit)} />
        </div>
      </div>
    </div>
  );
};
