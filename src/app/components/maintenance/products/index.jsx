import { useEffect, useMemo, useState } from "react";
import {
  ListItemIcon,
  ListItemText,
  MenuItem,
} from "@mui/material";
import { Delete, Edit } from "@mui/icons-material";
import { productList } from "src/app/services/maintenance/product";
import Table from "../../table";
import { AgregarButton } from "../../iu/button";
import ModalProduct from "../../modal/product/product";

export default function ProductsList() {
  const [data, setData] = useState([]);
  const [openModal, setOpenModal] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      const product = await productList();
      setData(product);
    };
    fetchData();
  }, []);

  const columns = useMemo(
    () => [
      {
        accessorKey: "chcodigoproducto",
        header: "CODIGO",
        size: 150,
      },
      {
        accessorKey: "chfamilia",
        header: "CATEGORIA",
        size: 150,
      },
      {
        accessorKey: "chtipo",
        header: "TIPO",
        size: 200,
      },
      {
        accessorKey: "chmarca",
        header: "MARCA",
        size: 150,
      },
      {
        accessorKey: "chunidadmedida",
        header: "MEDIDA",
        size: 150,
      },
      {
        accessorKey: "chdescripcion",
        header: "DESCRIPCIÓN",
        size: 500,
      },
      {
        accessorKey: "chsituacion",
        header: "SITUACIÓN",
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
        loading={data.length === 0}
        acciones={
          <AgregarButton
            text='Nuevo Producto'
            className='w-fit text-sm md:text-base'
            onClick={() => setOpenModal(true)}
          />
        }
      />
      {openModal && (
        <ModalProduct
          open={openModal}
          setOpen={setOpenModal}
          title='Nuevo Producto'
        />
      )}
    </div>
  );
}
