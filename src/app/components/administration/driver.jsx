import { useEffect, useMemo, useState } from 'react';
import Table from '../table'
import { IconButton, ListItemIcon, ListItemText, Menu, MenuItem } from '@mui/material';
import { Edit, MoreHoriz } from '@mui/icons-material';
import { getDriver } from 'src/app/services/administration/driver';
import ModalDriver from '../modal/administration/driver';

export default function DriverTable() {
  const [anchorEl, setAnchorEl] = useState(null);
  const [data, setData] = useState([]);
  const [openModal, setOpenModal] = useState(false);

  const open = Boolean(anchorEl);

  const columns = useMemo(() => [
    {
      accessorKey: 'chcodigoconductor',
      header: 'CODIGO',
      size: 150
    },
    {
      accessorKey: 'chnombres',
      header: 'CONDUCTOR',
      size: 150
    },
    {
      accessorKey: 'chnrodocumento',
      header: 'DNI',
      size: 150
    },
    {
      accessorKey: 'chcategoriabrebete',
      header: 'CATEGORIA',
      size: 150
    },
    {
      accessorKey: 'chnumerobrebete',
      header: 'BREBETE',
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
      const driver = await getDriver();
      setData(driver);
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
        openModal && <ModalDriver open={openModal} setOpen={setOpenModal} title='Conductor' />
      }
    </div>
  )
}
