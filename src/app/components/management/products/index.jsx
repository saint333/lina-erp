import { Visibility } from "@mui/icons-material";
import { ListItemIcon, ListItemText, MenuItem } from "@mui/material";
import { useEffect, useMemo, useState } from "react";
import Table from "../../table";
import { ProductModal } from "../../modal/management/product";

export default function KardexTable() {
  const [data, setData] = useState([
    {
      razon: "0001",
      chcodigoproveedor: "0001",
      chtipodocumento: "0001",
      chnrodocumento: "0001",
      chdireccion: "0001",
      chtelefono: "0001",
      chemail: "0001",
    }
  ]);
  const [openModal, setOpenModal] = useState(false);

  useEffect(() => {

  }, []);

  const columns = useMemo(
    () => [
      {
        accessorKey: "chcodigoproveedor",
        header: "CATEGORIA",
        size: 150,
      },
      {
        accessorKey: "razon",
        header: "CODIGO",
        size: 150,
      },
      {
        accessorKey: "chtipodocumento",
        header: "DESCRIPCION",
        size: 200,
      },
      {
        accessorKey: "chnrodocumento",
        header: "UNIDAD MEDIDA",
        size: 150,
      },
      {
        accessorKey: "chdireccion",
        header: "STOCK",
        size: 150,
      },
    ],
    []
  );

  const renderRowActions = ({ closeMenu, row }) => [
    <MenuItem
      onClick={() => {
        closeMenu();
        setOpenModal(true);
      }}
      key={0}
    >
      <ListItemIcon>
        <Visibility fontSize='small' />
      </ListItemIcon>
      <ListItemText>Ver</ListItemText>
    </MenuItem>,
  ];

  return (
    <div className='grid gap-4 items-start'>
      <Table
        columns={columns}
        data={data}
        renderRowActionMenuItems={renderRowActions}
      />
      {
        openModal && <ProductModal open={openModal} setOpen={setOpenModal} title="Mantenimiento de tarjeta" />
      }
    </div>
  );
}
