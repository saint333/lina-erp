import { Delete, Edit, MoreHoriz } from "@mui/icons-material";
import { Divider, IconButton, Menu, MenuItem } from "@mui/material";
import { useEffect, useMemo, useState } from "react";
import { AgregarButton } from "../../button/button";
import Table from "../../table";
import EntryModal from "../../modal/management/entry";

export default function EntryTable({ product }) {
  const [data, setData] = useState([]);
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const [openModal, setOpenModal] = useState(false);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

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
          <MoreHoriz />
        </IconButton>
        <Menu
          id='long-menu'
          MenuListProps={{
            "aria-labelledby": "long-button",
          }}
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
          PopoverClasses={{ paper: "!shadow-lg" }}
        >
          <MenuItem onClick={handleClose}>
            <Edit />
          </MenuItem>
          <MenuItem onClick={handleClose}>
            <Delete />
          </MenuItem>
        </Menu>
      </div>
    );
  };
  return (
    <div className='grid gap-4 items-start'>
      <AgregarButton
        text='Nuevo Ingreso'
        className='w-fit'
        onClick={() => setOpenModal(true)}
      />
      <Divider />
      <Table
        columns={columns}
        data={data}
        renderRowActions={renderRowActions}
      />
      <EntryModal open={openModal} setOpen={setOpenModal} title="Ingreso de Productos" />
    </div>
  );
}
