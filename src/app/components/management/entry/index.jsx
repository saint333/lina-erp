import { Delete, Edit } from "@mui/icons-material";
import { ListItemIcon, ListItemText, Menu, MenuItem } from "@mui/material";
import { useEffect, useMemo, useState } from "react";
import { AgregarButton } from "../../iu/button";
import Table from "../../table";
import EntryModal from "../../modal/management/entry";
import { getProductManagement } from "src/app/services/management/entry";

export default function EntryTable() {
  const [data, setData] = useState([]);
  const [openModal, setOpenModal] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      const response = await getProductManagement({
        clase: "I",
        movimiento: "14",
      });
      setData(response);
    };
    fetchData();
  }, []);

  const columns = useMemo(
    () => [
      {
        accessorKey: "p_inidcorrevale",
        header: "N° INGRESO",
        size: 150,
      },
      {
        accessorKey: "chvalefechaemision",
        header: "FECHA EMISION",
        size: 150,
      },
      {
        accessorKey: "chmovimiento",
        header: "MOVIMIENTO",
        size: 200,
      },
      {
        accessorKey: "chobservacion",
        header: "OBSERVACION",
        size: 150,
      },
      {
        accessorKey: "chestado",
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
        loading={data.length === 0}
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
