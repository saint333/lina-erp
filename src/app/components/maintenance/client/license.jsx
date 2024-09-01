import { useEffect, useMemo, useState } from "react";
import {
  ListItemIcon,
  ListItemText,
  MenuItem,
} from "@mui/material";
import { Delete, Edit } from "@mui/icons-material";
import { LicenseList } from "src/app/services/maintenance/client";
import Table from "../../table";
import { AgregarButton } from "../../button/button";
import ModalLicense from "../../modal/license/license";

export default function License() {
  const [data, setData] = useState([]);
  const [openModal, setOpenModal] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      const product = await LicenseList();
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
        accessorKey: "chlicencia",
        header: "LICENCIA",
        size: 150,
      },
      {
        accessorKey: "bodefenzapersonal",
        header: "DEFENZA PERSONAL",
        size: 150,
      },
      {
        accessorKey: "bocaza",
        header: "CAZA",
        size: 150,
      },
      {
        accessorKey: "bodeporte",
        header: "DEPORTE",
        size: 150,
      },
      {
        accessorKey: "boseguridaprivada",
        header: "SEGUIRIDAD PRIVADA",
        size: 150,
      },
      {
        accessorKey: "bosispe",
        header: "SISPE",
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
        setOpenModal(true);
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
            text='Nueva Licencia'
            className='w-fit text-sm md:text-base'
            onClick={() => setOpenModal(true)}
          />
        }
        loading={data.length === 0}
      />
      {openModal && (
        <ModalLicense
          open={openModal}
          setOpen={setOpenModal}
          title='Mantenimiento de Licencia'
        />
      )}
    </div>
  );
}
