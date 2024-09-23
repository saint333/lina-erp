import { Visibility } from "@mui/icons-material";
import { ListItemIcon, ListItemText, MenuItem } from "@mui/material";
import { useEffect, useMemo, useState } from "react";
import Table from "../../table";
import { ProductModal } from "../../modal/management/product";
import { getProductManagement, getWarehouseBalanceDetail } from "src/app/services/management/product";

export default function KardexTable() {
  const [data, setData] = useState([]);
  const [openModal, setOpenModal] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      const response = await getProductManagement();
      setData(response);
    };
    fetchData();
  }, []);

  const columns = useMemo(
    () => [
      {
        accessorKey: "chfamiliaproducto",
        header: "CATEGORIA",
        size: 150,
      },
      {
        accessorKey: "chcodigoproducto",
        header: "CODIGO",
        size: 150,
      },
      {
        accessorKey: "chdescripcion",
        header: "DESCRIPCION",
        size: 500,
      },
      {
        accessorKey: "chunidadmedida",
        header: "UNIDAD MEDIDA",
        size: 150,
      },
      {
        accessorKey: "stock",
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
        handleView(row);
      }}
      key={0}
    >
      <ListItemIcon>
        <Visibility fontSize='small' />
      </ListItemIcon>
      <ListItemText>Ver</ListItemText>
    </MenuItem>,
  ];

  const handleView = async (row) => {
    const response = await getWarehouseBalanceDetail(row.original.p_inidproducto);
    console.log("🚀 ~ handleView ~ response:", response)
    setOpenModal(true);
  }

  return (
    <div className='grid gap-4 items-start'>
      <Table
        columns={columns}
        data={data}
        renderRowActionMenuItems={renderRowActions}
        loading={data.length === 0}
      />
      {openModal && (
        <ProductModal
          open={openModal}
          setOpen={setOpenModal}
          title='Mantenimiento de tarjeta'
        />
      )}
    </div>
  );
}
