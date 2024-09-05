import { useEffect, useMemo, useState } from "react";
import { ListItemIcon, ListItemText, MenuItem } from "@mui/material";
import { Delete, Print, Visibility } from "@mui/icons-material";
import Table from "../../table";
import ConsultModal from "../../modal/print/consult";

export default function ConsultTable({ product }) {
  const [data, setData] = useState([]);
  const [openModal, setOpenModal] = useState(false);

  useEffect(() => {
    setData([
      {
        chcodigoproveedor: "123456",
        razon: "Cesar",
        chtipodocumento: "DNI",
        chnrodocumento: "12345678",
        chdireccion: "Av. Los Pinos",
        chtelefono: "123456789",
        chemail: "",
      },
    ]);
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
        <Visibility fontSize='small' />
      </ListItemIcon>
      <ListItemText>Ver</ListItemText>
    </MenuItem>,
    <MenuItem
      onClick={() => {
        closeMenu();
        setOpenModal(true);
      }}
      key={1}
    >
      <ListItemIcon>
        <Print fontSize='small' />
      </ListItemIcon>
      <ListItemText>Imprimir</ListItemText>
    </MenuItem>,
    <MenuItem
      onClick={() => {
        closeMenu();
      }}
      key={2}
    >
      <ListItemIcon>
        <Delete fontSize='small' />
      </ListItemIcon>
      <ListItemText>Eliminar</ListItemText>
    </MenuItem>,
  ];

  return (
    <div className='grid gap-4 items-start'>
      <Table
        columns={columns}
        data={data}
        renderRowActionMenuItems={renderRowActions}
      />
      {openModal && (
        <ConsultModal
          open={openModal}
          setOpen={setOpenModal}
          title='Facturación Electronica - Salva la Amazonia con tus facturas'
        />
      )}
    </div>
  );
}
