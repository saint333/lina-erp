import { useEffect, useMemo, useState } from "react";
import { ListItemIcon, ListItemText, MenuItem } from "@mui/material";
import { Delete, Edit } from "@mui/icons-material";
import {
  DetailClientServices,
  List,
} from "src/app/services/maintenance/client";
import Table from "../../table";
import { AgregarButton } from "../../button/button";
import ModalClient from "../../modal/client/client";

export default function ClientList() {
  const [data, setData] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const [client, setClient] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const product = await List();
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
        accessorKey: "razon",
        header: "PERSONA - EMPRESA",
        size: 150,
      },
      {
        accessorKey: "chtipodocumento",
        header: "DOCUMENTO",
        size: 200,
      },
      {
        accessorKey: "chnrodocumento",
        header: "N DOCUMENTO",
        size: 150,
      },
      {
        accessorKey: "chdireccion",
        header: "DIRECCIÓN",
        size: 250,
      },
      {
        accessorKey: "chtelefono",
        header: "TELEFONO",
        size: 150,
      },
    ],
    []
  );

  const renderRowActions = ({ closeMenu, row }) => [
    <MenuItem
      onClick={() => {
        handleEdit(row);
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

  const handleEdit = async (row) => {
    const response = await DetailClientServices({
      client: row.original.p_inidcliente,
      legal: row.original.p_inidjurinat,
    });
    setClient(response[0]);
    setOpenModal(true);
  };

  return (
    <div className='grid gap-4 items-start'>
      <Table
        columns={columns}
        data={data}
        renderRowActionMenuItems={renderRowActions}
        acciones={
          <AgregarButton
            text='Agregar'
            className='w-fit'
            onClick={() => {
              setClient(null);
              setOpenModal(true)
            }}
          />
        }
        loading={data.length === 0}
      />
      {openModal && (
        <ModalClient
          open={openModal}
          setOpen={setOpenModal}
          title='Mantenimiento de Cliente'
          client={client}
        />
      )}
    </div>
  );
}
