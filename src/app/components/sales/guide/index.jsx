import { Shop } from "@mui/icons-material";
import { ListItemIcon, ListItemText, MenuItem } from "@mui/material";
import { useEffect, useMemo, useState } from "react";
import Table from "../../table";

export default function GuideTable({ product }) {
  const [data, setData] = useState([]);

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
        <Shop fontSize='small' />
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
