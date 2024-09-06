import { useEffect, useMemo, useState } from "react";
import { ListItemIcon, ListItemText, MenuItem } from "@mui/material";
import { Delete, Edit } from "@mui/icons-material";
import { ResolutionList } from "src/app/services/maintenance/client";
import Table from "../../table";
import { AgregarButton } from "../../iu/button";
import ModalResolution from "../../modal/resolution/resolution";

export default function ResolutionCard() {
  const [data, setData] = useState([]);
  const [openModal, setOpenModal] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      const product = await ResolutionList();
      setData(product);
    };
    fetchData();
  }, []);

  const columns = useMemo(
    () => [
      {
        accessorKey: "chcodigocliente",
        header: "CODIGO",
        size: 150,
      },
      {
        accessorKey: "chtipocliente",
        header: "TIPO CLIENTE",
        size: 150,
      },
      {
        accessorKey: "razon",
        header: "CLIENTE",
        size: 200,
      },
      {
        accessorKey: "chresolucion",
        header: "RESOLUCIÓN",
        size: 150,
      },
      {
        accessorKey: "chfechavencimiento",
        header: "FECHA VENCIMIENTO",
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
            text='Nueva Resolución'
            className='w-fit text-sm md:text-base'
            onClick={() => setOpenModal(true)}
          />
        }
        loading={data.length === 0}
      />
      {openModal && (
        <ModalResolution
          open={openModal}
          setOpen={setOpenModal}
          title='Mantenimiento de Resolución'
        />
      )}
    </div>
  );
}
