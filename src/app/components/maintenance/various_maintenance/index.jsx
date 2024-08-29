import { useEffect, useMemo, useState } from "react";
import Table from "../../table";
import { Master } from "src/app/services";
import { IconButton, Menu, MenuItem } from "@mui/material";
import { Edit, Visibility } from "@mui/icons-material";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";

export default function VariousMaintenance() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [anchorEl, setAnchorEl] = useState(null);
  const [openModal, setOpenModal] = useState(false);
  const open = Boolean(anchorEl);

  const columns = useMemo(() => [
    {
      accessorKey: "p_inidmaestrocabecera",
      header: "CODIGO",
      size: 150,
    },
    {
      accessorKey: "chcodigomaestrocabecera",
      header: "DESCRIPCION",
      size: 150,
    },
    {
      accessorKey: "chmaestrocabecera",
      header: "OBSERVACION",
      size: 150,
    }
  ]);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

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
            <Visibility />
          </MenuItem>
        </Menu>
      </div>
    );
  };

  useEffect(() => {
    const fetchData = async () => {
      const product = await Master();
      setData(product);
      setLoading(false);
    };
    fetchData();
  }, []);

  return (
    <div className='grid gap-4 items-start'>
      <Table
        columns={columns}
        data={data}
        renderRowActions={renderRowActions}
        loading={loading}
      />
    </div>
  );
}
