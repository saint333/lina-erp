import { useEffect, useMemo, useState } from "react";
import { ListItemIcon, ListItemText, MenuItem } from "@mui/material";
import { Delete, Edit } from "@mui/icons-material";
import {
  DetailSupplierServices,
  SupplierList,
  SupplierServices,
} from "src/app/services/maintenance/suppliers";
import Table from "../../table";
import { AgregarButton, CancelButton, SaveButton } from "../../iu/button";
import ModalSuppliers from "../../modal/suppliers/client";
import { useSnackbar } from "notistack";
import { Confirm } from "../../iu/confirm";

export default function Supplier() {
  const [data, setData] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const [client, setClient] = useState(null);
  const [loading, setLoading] = useState(true);
  const [confirm, setConfirm] = useState(false);
  const [rowData, setRowData] = useState(null);
  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    const fetchData = async () => {
      const product = await SupplierList();
      setData(product);
      setLoading(false);
    };
    fetchData();
  }, []);

  const columns = useMemo(
    () => [
      {
        accessorKey: "chcodigoproveedor",
        header: "CODIGO",
        size: 150,
      },
      {
        accessorKey: "razon",
        header: "PERSONA - EMPRESA",
        size: 150,
      },
      {
        accessorKey: "chtipodocumento",
        header: "DOCUMENTO",
        size: 200,
      },
      {
        accessorKey: "chnrodocumento",
        header: "N° DOCUMENTO",
        size: 150,
      },
      {
        accessorKey: "chdireccion",
        header: "DIRECCIÓN",
        size: 500,
      },
      {
        accessorKey: "chtelefono",
        header: "TELEFONO",
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
    const response = await DetailSupplierServices({
      client: row.original.p_inidproveedor,
      legal: row.original.p_inidjurinat,
    });
    setClient(response);
    setOpenModal(true);
  };

  const handleDelete = async () => {
    const data = {
      p_inidproveedor: rowData.original.p_inidproveedor,
      p_inidjurinat: rowData.original.p_inidjurinat,
    };
    const letterAccion = "D";
    const list = await SupplierServices({ data, letterAccion });
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
        acciones={
          <AgregarButton
            text='Nuevo Proveedor'
            className='w-fit text-sm md:text-base'
            onClick={() => setOpenModal(true)}
          />
        }
        loading={loading}
      />
      {openModal && (
        <ModalSuppliers
          open={openModal}
          setOpen={setOpenModal}
          title='Mantenimiento de Proveedor'
          client={client}
          setData={setData}
          setClient={setClient}
        />
      )}
      {confirm && (
        <Confirm
          open={confirm}
          message={"Desea eliminar el siguiente registro"}
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
