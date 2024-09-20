import { useEffect, useMemo, useState } from "react";
import Table from "../../table";
import { Master } from "src/app/services";
import { ListItemIcon, ListItemText, MenuItem } from "@mui/material";
import { Delete, Edit } from "@mui/icons-material";
import ModalVarious from "../../modal/various_maintenence";

export default function VariousMaintenance() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [openModal, setOpenModal] = useState(false);
  const [idRow, setIdRow] = useState(null);

  const columns = useMemo(() => [
    {
      accessorKey: "p_inidmaestrocabecera",
      header: "CODIGO",
      size: 150,
    },
    {
      accessorKey: "chcodigomaestrocabecera",
      header: "DESCRIPCION",
      size: 150,
    },
    {
      accessorKey: "chmaestrocabecera",
      header: "OBSERVACION",
      size: 150,
    },
  ]);

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
  ];

  useEffect(() => {
    const fetchData = async () => {
      const product = await Master();
      setData(product);
      setLoading(false);
    };
    fetchData();
  }, []);

  const handleEdit = async (row) => {
    setIdRow(row.original.p_inidmaestrocabecera);
    setOpenModal(true);
  };

  return (
    <div className='grid gap-4 items-start'>
      <Table
        columns={columns}
        data={data}
        renderRowActionMenuItems={renderRowActions}
        loading={loading}
      />
      {openModal && (
        <ModalVarious
          open={openModal}
          setOpen={setOpenModal}
          id={idRow}
          title='Mantenimiento de Productos'
        />
      )}
    </div>
  );
}
