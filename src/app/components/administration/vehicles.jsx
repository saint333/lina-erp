import { useEffect, useMemo, useState } from 'react';
import Table from '../table'
import { IconButton, ListItemIcon, ListItemText, Menu, MenuItem } from '@mui/material';
import { Edit, MoreHoriz } from '@mui/icons-material';
import { getVehicles } from 'src/app/services/administration/vehicles';
import ModalVehicle from '../modal/administration/vehicles';

export default function VehiclesTable() {
  const [anchorEl, setAnchorEl] = useState(null);
  const [data, setData] = useState([]);
  const [openModal, setOpenModal] = useState(false);

  const open = Boolean(anchorEl);

  const columns = useMemo(() => [
    {
      accessorKey: 'chcodigovehiculo',
      header: 'CODIGO',
      size: 150
    },
    {
      accessorKey: 'chmarca',
      header: 'MARCA',
      size: 150
    },
    {
      accessorKey: 'chplaca',
      header: 'PLACA',
      size: 150
    }
  ])

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
          <MenuItem onClick={() => setOpenModal(true)}>
            <ListItemIcon>
              <Edit fontSize='small' />
            </ListItemIcon>
            <ListItemText>Editar</ListItemText>
          </MenuItem>
        </Menu>
      </div>
    );
  };

  useEffect(() => {
    const fetchData = async () => {
      const vehicles = await getVehicles();
      setData(vehicles);
    };
    fetchData();
  }, []);

  return (
    <div>
      <Table 
        columns={columns}
        data={data}
        renderRowActions={renderRowActions}
      />
      {
        openModal && <ModalVehicle open={openModal} setOpen={setOpenModal} title="Vehiculo añadir" />
      }
    </div>
  )
}
