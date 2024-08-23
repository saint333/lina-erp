import { MoreHoriz, Shop } from "@mui/icons-material";
import { IconButton, Menu, MenuItem } from "@mui/material";
import { useEffect, useMemo, useState } from "react";
import Table from "../../table";

export default function GuideTable({product}) {
  const [data, setData] = useState([]);
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

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
        accessorKey: "chcodigoproveedor",
        header: "T.DOC",
        size: 150,
      },
      {
        accessorKey: "razon",
        header: "N° DOC",
        size: 150,
      },
      {
        accessorKey: "chtipodocumento",
        header: "CLIENTE",
        size: 200,
      },
      {
        accessorKey: "chnrodocumento",
        header: "TIPO DOCUMENTO",
        size: 150,
      },
      {
        accessorKey: "chdireccion",
        header: "DOCUMENTO",
        size: 150,
      },
      {
        accessorKey: "chtelefono",
        header: "FECHA EMISION",
        size: 150,
      },
      {
        accessorKey: "chemail",
        header: "MONEDA",
        size: 150,
      },
      {
        accessorKey: "chcontacto",
        header: "IMPORTE",
        size: 150,
      },
      {
        accessorKey: "chtelefonocontacto",
        header: "ESTADO",
        size: 150,
      }
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
          PopoverClasses={{ paper: '!shadow-lg' }}
        >
          <MenuItem onClick={handleClose}>
            <Shop />
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
      />
    </div>
  )
}
