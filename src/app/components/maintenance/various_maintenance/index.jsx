import { useEffect, useMemo, useState } from "react";
import Table from "../../table";
import { Master } from "src/app/services";
import {
  IconButton,
  ListItemIcon,
  ListItemText,
  Menu,
  MenuItem,
} from "@mui/material";
import { Edit, Visibility } from "@mui/icons-material";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import ModalVarious from "../../modal/various_maintenence";

export default function VariousMaintenance() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [anchorEl, setAnchorEl] = useState(null);
  const [openModal, setOpenModal] = useState(false);
  const [idRow, setIdRow] = useState(null);
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
    },
  ]);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const renderRowActions = (row) => {
    console.log("🚀 ~ renderRowActions ~ row:", row.row)
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
          <MenuItem onClick={() => handleEdit(row.row)}>
            <ListItemIcon>
              <Edit fontSize='small' />
            </ListItemIcon>
            <ListItemText>Editar</ListItemText>
          </MenuItem>
          {/* <MenuItem onClick={handleClose}>
            <ListItemIcon>
              <Visibility fontSize='small' />
            </ListItemIcon>
            <ListItemText>Editar</ListItemText>
          </MenuItem> */}
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

  const handleEdit = async (row) => {
    console.log("🚀 ~ handleEdit ~ row:", row.row.original.p_inidmaestrocabecera)
    setIdRow(row.row.original.p_inidmaestrocabecera)
    handleClose();
    setOpenModal(true);
  }

  return (
    <div className='grid gap-4 items-start'>
      <Table
        columns={columns}
        data={data}
        renderRowActions={renderRowActions}
        loading={loading}
      />
      {
        openModal && <ModalVarious open={openModal} setOpen={setOpenModal} id={idRow} title='Mantenimiento de Productos' />
      }
    </div>
  );
}
