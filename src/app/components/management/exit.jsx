import { Delete, Edit } from "@mui/icons-material";
import { ListItemIcon, ListItemText, MenuItem } from "@mui/material";
import { useEffect, useMemo, useState } from "react";
import ExitModal from "../modal/management/exit";
import { AgregarButton } from "../iu/button";
import Table from "../table";
import { getProductManagement } from "src/app/services/management/entry";

export default function ExitTable() {
  const [data, setData] = useState([]); 
  const [openModal, setOpenModal] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      const response = await getProductManagement({
        clase: "S",
        movimiento: "19",
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
            text='Nueva Salida'
            className='w-fit'
            onClick={() => setOpenModal(true)}
          />
        }
        loading={data.length === 0}
      />
      {openModal && (
        <ExitModal
          open={openModal}
          setOpen={setOpenModal}
          title='Salida de Productos'
        />
      )}
    </div>
  );
}
