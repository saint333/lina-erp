import { Controller, useForm } from "react-hook-form";
import ModalBasic from "..";
import { AgregarButton, CancelButton, SaveButton } from "../../iu/button";
import { useEffect, useMemo, useState } from "react";
import { addMaster, commonServices } from "src/app/services";
import Table from "../../table";
import { ListItemIcon, ListItemText, MenuItem, TextField } from "@mui/material";
import { Delete } from "@mui/icons-material";
import { useSnackbar } from "notistack";

export default function ModalVarious({ open, setOpen, title, id }) {
  const defaultValues = {
    p_inidmaestrodetalle: null,
    p_inidmaestrocabecera: "",
    chcodigomaestrodetalle: "",
    chmaestrodetalle: "",
  };

  const [data, setData] = useState([]);
  const { enqueueSnackbar } = useSnackbar();

  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
    reset,
    setValue: setFormValue,
  } = useForm({
    defaultValues,
  });

  const handleClose = () => {
    reset(defaultValues);
    setOpen(false);
  };

  const onSubmit = async (data) => {
    console.log(data);
    data = { ...data, p_inidmaestrocabecera: id };
    const letterAccion = "I";
    const list = await addMaster({ data, letterAccion });
    if (list.codigo == 1) {
      enqueueSnackbar(list.valor, {
        variant: "success",
        style: { fontSize: "1.3rem" },
      });
    } else {
      enqueueSnackbar(list.valor, {
        variant: "error",
        style: { fontSize: "1.3rem" },
      });
    }
    setFormValue("chmaestrodetalle", "");
    setData((prev) => [...prev, data]);
  };

  useEffect(() => {
    const fetchData = async () => {
      const product = await commonServices({ letterAccion: id });
      setData(product);
    };
    fetchData();
  }, [id]);

  const columns = useMemo(() => [
    {
      accessorKey: "chmaestrodetalle",
      header: "DESCRIPCION",
      size: 150,
    },
  ]);

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

  const renderRowActions = ({ closeMenu, row }) => [
    <MenuItem
      onClick={async () => {
        const data = row.original
        const list = await addMaster({ data, letterAccion: "D" });
        if (list.codigo == 1) {
          enqueueSnackbar(list.valor, {
            variant: "success",
            style: { fontSize: "1.3rem" },
          });
        } else {
          enqueueSnackbar(list.valor, {
            variant: "error",
            style: { fontSize: "1.3rem" },
          });
        }
        setData((prev) => prev.filter((item) => item !== row.original));
        closeMenu();
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
          <SaveButton text='Guardar' onClick={handleClose} />
          <CancelButton text='Cancelar' onClick={handleClose} />
        </div>
      }
    >
      <div className='mt-6 flex'>
        <CustomInput label='DESCRIPCION' textKey='chmaestrodetalle' />
        <AgregarButton
          text='Agregar'
          onClick={handleSubmit(onSubmit)}
          className='ml-5 w-min'
        />
      </div>
      <Table
        columns={columns}
        data={data}
        renderRowActionMenuItems={renderRowActions}
      />
    </ModalBasic>
  );
}
