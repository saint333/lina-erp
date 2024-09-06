import { Delete, Edit } from "@mui/icons-material";
import { ListItemIcon, ListItemText, Menu, MenuItem } from "@mui/material";
import { useEffect, useMemo, useState } from "react";
import { AgregarButton } from "../../iu/button";
import Table from "../../table";
import EntryModal from "../../modal/management/entry";

export default function EntryTable({ product }) {
  const [data, setData] = useState([]);
  const [openModal, setOpenModal] = useState(false);

  useEffect(() => {
    setData(product);
  }, [product]);

  const columns = useMemo(
    () => [
      {
        accessorKey: "razon",
        header: "N° INGRESO",
        size: 150,
      },
      {
        accessorKey: "chcodigoproveedor",
        header: "FECHA EMISION",
        size: 150,
      },
      {
        accessorKey: "chtipodocumento",
        header: "MOVIMIENTO",
        size: 200,
      },
      {
        accessorKey: "chnrodocumento",
        header: "OBSERVACION",
        size: 150,
      },
      {
        accessorKey: "chdireccion",
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
      }}
      key={0}
    >
      <ListItemIcon>
        <Edit fontSize='small' />
      </ListItemIcon>
      <ListItemText>Editar</ListItemText>
    </MenuItem>,
    <MenuItem
      onClick={() => {
        closeMenu();
      }}
      key={1}
    >
      <ListItemIcon>
        <Delete fontSize='small' />
      </ListItemIcon>
      <ListItemText>Eliminar</ListItemText>
    </MenuItem>,
  ];

  return (
    <div className='grid gap-4 items-start'>
      <Table
        columns={columns}
        data={data}
        renderRowActionMenuItems={renderRowActions}
        acciones={
          <AgregarButton
            text='Nuevo Ingreso'
            className='w-fit'
            onClick={() => setOpenModal(true)}
          />
        }
      />
      {openModal && (
        <EntryModal
          open={openModal}
          setOpen={setOpenModal}
          title='Ingreso de Productos'
        />
      )}
    </div>
  );
}
