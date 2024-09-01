import { Visibility } from "@mui/icons-material";
import { ListItemIcon, ListItemText, MenuItem } from "@mui/material";
import { useEffect, useMemo, useState } from "react";
import Table from "../../table";

export default function KardexTable({ product }) {
  const [data, setData] = useState([]);

  useEffect(() => {
    setData(product);
  }, [product]);

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
    </div>
  );
}
