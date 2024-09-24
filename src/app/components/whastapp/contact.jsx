import { Delete, Edit } from "@mui/icons-material";
import { ListItemIcon, ListItemText, MenuItem } from "@mui/material";
import { useEffect, useMemo, useState } from "react";
import Table from "../table";
import { actionContact, getContact } from "src/app/services/whatsapp/contact";
import { AgregarButton } from "../iu/button";
import { ContactModal } from "../modal/whatsapp/contact";
import { useSnackbar } from "notistack";

export const ContactTable = () => {
  const [data, setData] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const [rowData, setRowData] = useState(null);
  const { enqueueSnackbar } = useSnackbar();

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
      {
        accessorKey: "status",
        header: "ESTADO",
        size: 150,
      },
    ],
    []
  );

  const renderRowActions = ({ closeMenu, row }) => [
    <MenuItem
      onClick={() => {
        closeMenu();
        setRowData(row.original);
        setOpenModal(true);
      }}
      key={0}
    >
      <ListItemIcon>
        <Edit fontSize='small' />
      </ListItemIcon>
      <ListItemText>Editar</ListItemText>
    </MenuItem>,
    <MenuItem
      onClick={async () => {
        closeMenu();
        const response = await actionContact(row.original, "D");
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
        setData((prev) =>
          prev.filter(
            (item) => item.p_inidcontact !== row.original.p_inidcontact
          )
        );
      }}
      key={1}
    >
      <ListItemIcon>
        <Delete fontSize='small' />
      </ListItemIcon>
      <ListItemText>Eliminar</ListItemText>
    </MenuItem>,
  ];

  useEffect(() => {
    const fetchData = async () => {
      const product = await getContact();
      setData(product);
    };
    fetchData();
  }, [openModal]);

  return (
    <div className='grid gap-4 items-start'>
      <Table
        columns={columns}
        data={data}
        loading={data.length === 0}
        renderRowActionMenuItems={renderRowActions}
        acciones={
          <AgregarButton
            text='Nuevo'
            className='w-fit'
            onClick={() => setOpenModal(true)}
          />
        }
      />
      {openModal && (
        <ContactModal
          open={openModal}
          setOpen={setOpenModal}
          title='Datos de contacto'
          data={rowData}
          setData={setRowData}
        />
      )}
    </div>
  );
};
