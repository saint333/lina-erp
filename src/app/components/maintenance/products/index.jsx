import { useEffect, useMemo, useState } from "react";
import { ListItemIcon, ListItemText, MenuItem } from "@mui/material";
import { Delete, Edit } from "@mui/icons-material";
import {
  DetailProduct,
  productList,
} from "src/app/services/maintenance/product";
import Table from "../../table";
import { AgregarButton, CancelButton, SaveButton } from "../../iu/button";
import ModalProduct from "../../modal/product/product";
import { useSnackbar } from "notistack";
import { Confirm } from "../../iu/confirm";

export default function ProductsList() {
  const [data, setData] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const [product, setProduct] = useState(null);
  const [confirm, setConfirm] = useState(false);
  const [rowData, setRowData] = useState(null);
  const { enqueueSnackbar } = useSnackbar();

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
        handleEdit(row);
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
        setRowData(row);
        setConfirm(true);
      }}
      key={1}
    >
      <ListItemIcon>
        <Delete fontSize='small' />
      </ListItemIcon>
      <ListItemText>Eliminar</ListItemText>
    </MenuItem>,
  ];

  const handleEdit = async (row) => {
    const response = await DetailProduct(row.original.p_inidproducto);
    setProduct(response);
    setOpenModal(true);
  };

  const handleDelete = async () => {
    setConfirm(false);
  };

  const handleCloseDelete = () => {
    setConfirm(false);
  };

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
          product={product}
          setProduct={setProduct}
          setData={setData}
        />
      )}
      {confirm && (
        <Confirm
          open={confirm}
          message={`Desea eliminar el siguiente registro`}
          actions={
            <>
              <SaveButton text='Eliminar' onClick={handleDelete} />
              <CancelButton text='Cancelar' onClick={handleCloseDelete} />
            </>
          }
          handleClose={handleCloseDelete}
          title={"Eliminar Registro"}
        />
      )}
    </div>
  );
}
