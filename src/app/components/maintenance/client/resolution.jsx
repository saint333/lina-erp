import { useEffect, useMemo, useState } from "react";
import { IconButton, ListItemIcon, ListItemText, Menu, MenuItem } from "@mui/material";
import { Delete, Edit } from "@mui/icons-material";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import { ResolutionList } from "src/app/services/maintenance/client";
import Table from "../../table";
import { AgregarButton } from "../../button/button";
import ModalResolution from "../../modal/resolution/resolution";

export default function ResolutionCard() {
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
          <MenuItem onClick={handleClose}>
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

  return (
    <div className='grid gap-4 items-start'>
      <Table
        columns={columns}
        data={data}
        renderRowActions={renderRowActions}
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
