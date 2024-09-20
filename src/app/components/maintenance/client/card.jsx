import { useEffect, useMemo, useState } from "react";
import { ListItemIcon, ListItemText, MenuItem } from "@mui/material";
import { Delete, Edit } from "@mui/icons-material";
import { CardList } from "src/app/services/maintenance/client";
import Table from "../../table";
import { AgregarButton } from "../../iu/button";
import ModalCard from "../../modal/card";

export default function CardLicense() {
  const [data, setData] = useState([]);
  const [openModal, setOpenModal] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      const product = await CardList();
      setData(product);
    };
    fetchData();
  }, []);

  const columns = useMemo(
    () => [
      {
        accessorKey: "chcodigocliente",
        header: "CODIGO",
        size: 150,
      },
      {
        accessorKey: "chtipocliente",
        header: "TIPO CLIENTE",
        size: 150,
      },
      {
        accessorKey: "razon",
        header: "CLIENTE",
        size: 200,
      },
      {
        accessorKey: "chtarjeta",
        header: "TARJETA",
        size: 150,
      },
      {
        accessorKey: "modalidad",
        header: "MODALIDAD",
        size: 150,
      },
      {
        accessorKey: "chtipo",
        header: "ARMA TIPO",
        size: 150,
      },
      {
        accessorKey: "chmodelo",
        header: "ARMA MODELO",
        size: 150,
      },
      {
        accessorKey: "chmarca",
        header: "ARMA MARCA",
        size: 150,
      },
      {
        accessorKey: "chcalibre",
        header: "ARMA CALIBRE",
        size: 150,
      },
      {
        accessorKey: "chserie",
        header: "ARMA SERIE",
        size: 150,
      },
    ],
    []
  );

  const renderRowActions = ({ closeMenu, row }) => [
    <MenuItem
      onClick={() => {
        setOpenModal(true);
        closeMenu();
      }}
      key={0}
    >
      <ListItemIcon>
        <Edit fontSize='small' />
      </ListItemIcon>
      <ListItemText>Editar</ListItemText>
    </MenuItem>,
    <MenuItem
      onClick={() => {
        closeMenu();
      }}
      key={1}
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
        acciones={
          <AgregarButton
            text='Nueva Tarjeta'
            className='w-fit text-sm md:text-base'
            onClick={() => setOpenModal(true)}
          />
        }
        loading={data.length === 0}
      />
      {openModal && (
        <ModalCard
          open={openModal}
          setOpen={setOpenModal}
          title='Mantenimiento de Tarjeta'
        />
      )}
    </div>
  );
}
