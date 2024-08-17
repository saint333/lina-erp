import { useEffect, useMemo, useState } from "react";
import { IconButton, Menu, MenuItem } from "@mui/material";
import { Delete, Edit } from "@mui/icons-material";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import { LicenseList } from "src/app/services/maintenance/client";
import Table from "../../table";
import { AgregarButton } from "../../button/button";
import ModalLicense from "../../modal/license/license";

export default function License() {
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
      <Table
        columns={columns}
        data={data}
        renderRowActions={renderRowActions}
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
