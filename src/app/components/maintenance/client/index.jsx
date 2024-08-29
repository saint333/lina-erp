import { useEffect, useMemo, useState } from "react";
import {
  IconButton,
  ListItemIcon,
  ListItemText,
  Menu,
  MenuItem,
} from "@mui/material";
import { Delete, Edit } from "@mui/icons-material";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import {
  DetailClientServices,
  List,
} from "src/app/services/maintenance/client";
import Table from "../../table";
import { AgregarButton } from "../../button/button";
import ModalClient from "../../modal/client/client";

export default function ClientList() {
  const [data, setData] = useState([]);
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const [openModal, setOpenModal] = useState(false);
  const [client, setClient] = useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

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

  const renderRowActions = (row) => {
    return (
      <div className='flex gap-2'>
        <IconButton
          aria-label='more'
          id='long-button'
          aria-controls={open ? "long-menu" : undefined}
          aria-expanded={open ? "true" : undefined}
          aria-haspopup='true'
          onClick={handleClick}
        >
          <MoreHorizIcon />
        </IconButton>
        <Menu
          id='long-menu'
          MenuListProps={{
            "aria-labelledby": "long-button",
          }}
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
          PopoverClasses={{ paper: "!shadow-sm" }}
        >
          <MenuItem onClick={() => handleEdit(row)}>
            <ListItemIcon>
              <Edit fontSize='small' />
            </ListItemIcon>
            <ListItemText>Editar</ListItemText>
          </MenuItem>
          <MenuItem onClick={handleClose}>
            <ListItemIcon>
            <Delete fontSize="small"/>
            </ListItemIcon>
            <ListItemText>Eliminar</ListItemText>
          </MenuItem>
        </Menu>
      </div>
    );
  };

  const handleEdit = async (row) => {
    const response = await DetailClientServices({
      client: row.row.original.p_inidcliente,
      legal: row.row.original.p_inidjurinat,
    });
    setClient(response[0]);
    setOpenModal(true);
    handleClose();
  };

  return (
    <div className='grid gap-4 items-start'>
      <Table
        columns={columns}
        data={data}
        renderRowActions={renderRowActions}
        acciones={
          <AgregarButton
            text='Agregar'
            className='w-fit'
            onClick={() => setOpenModal(true)}
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
