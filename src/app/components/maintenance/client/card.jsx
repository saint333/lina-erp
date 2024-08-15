import { useEffect, useMemo, useState } from "react";
import { IconButton, Menu, MenuItem } from "@mui/material";
import { Delete, Edit } from "@mui/icons-material";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import { CardList } from "src/app/services/maintenance/client";
import Table from "../../table";
import { AgregarButton } from "../../button/button";
import ModalCard from "../../modal/card";

export default function CardLicense() {
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
      const product = await CardList();
      setData(product);
    }
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
        accessorKey: "chtarjeta",
        header: "TARJETA",
        size: 150,
      },
      {
        accessorKey: "modalidad",
        header: "MODALIDAD",
        size: 150,
      },
      {
        accessorKey: "chtipo",
        header: "ARMA TIPO",
        size: 150,
      },
      {
        accessorKey: "chmodelo",
        header: "ARMA MODELO",
        size: 150,
      },
      {
        accessorKey: "chmarca",
        header: "ARMA MARCA",
        size: 150,
      },
      {
        accessorKey: "chcalibre",
        header: "ARMA CALIBRE",
        size: 150,
      },
      {
        accessorKey: "chserie",
        header: "ARMA SERIE",
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
          PopoverClasses={{ paper: '!shadow-lg' }}
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
      <Table
        columns={columns}
        data={data}
        renderRowActions={renderRowActions}
        acciones={<AgregarButton text='Nueva Tarjeta' className='w-fit' onClick={() => setOpenModal(true)} />}
        loading={data.length === 0}
      />
      <ModalCard open={openModal} setOpen={setOpenModal} title='Mantenimiento de Tarjeta' />
    </div>
  );
}
