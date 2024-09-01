import { Visibility } from "@mui/icons-material";
import { MenuItem } from "@mui/material";
import { useEffect, useMemo, useState } from "react";
import Table from "../../table";

export default function ExhibitionTable({ product }) {
  const [data, setData] = useState([]);

  useEffect(() => {
    setData(product);
  }, [product]);

  const columns = useMemo(
    () => [
      {
        accessorKey: "razon",
        header: "CODIGO",
        size: 150,
      },
      {
        accessorKey: "chcodigoproveedor",
        header: "CATEGORIA",
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
        header: "SERIE",
        size: 150,
      },
      {
        accessorKey: "chtelefono",
        header: "EXHIBION",
        size: 150,
      },
      {
        accessorKey: "chemail",
        header: "SITUACION",
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
