import { useEffect, useMemo, useState } from "react";
import { IconButton, ListItemIcon, ListItemText, Menu, MenuItem } from "@mui/material";
import { Delete, Edit } from "@mui/icons-material";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import {
  DetailSupplierServices,
  SupplierList,
} from "src/app/services/maintenance/suppliers";
import Table from "../../table";
import { AgregarButton } from "../../button/button";
import ModalSuppliers from "../../modal/suppliers/client";

export default function Supplier() {
  const [data, setData] = useState([]);
  const [anchorEl, setAnchorEl] = useState(null);
  const [openModal, setOpenModal] = useState(false);
  const open = Boolean(anchorEl);
  const [client, setClient] = useState(null);
  const [loading, setLoading] = useState(true);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  useEffect(() => {
    const fetchData = async () => {
      const product = await SupplierList();
      setData(product);
      setLoading(false);
    };
    fetchData();
  }, []);

  const columns = useMemo(
    () => [
      {
        accessorKey: "chcodigoproveedor",
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
        header: "N° DOCUMENTO",
        size: 150,
      },
      {
        accessorKey: "chdireccion",
        header: "DIRECCIÓN",
        size: 500,
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
    const response = await DetailSupplierServices({
      client: row.row.original.p_inidproveedor,
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
            text='Nueva Tarjeta'
            className='w-fit text-sm md:text-base'
            onClick={() => setOpenModal(true)}
          />
        }
        loading={loading}
      />
      {openModal && (
        <ModalSuppliers
          open={openModal}
          setOpen={setOpenModal}
          title='Mantenimiento de Proveedor'
          client={client}
          setData={setData}
        />
      )}
    </div>
  );
}
