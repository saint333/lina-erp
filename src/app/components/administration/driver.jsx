import { useEffect, useMemo, useState } from "react";
import Table from "../table";
import { ListItemIcon, ListItemText, MenuItem } from "@mui/material";
import { Edit } from "@mui/icons-material";
import { getDriver } from "src/app/services/administration/driver";
import ModalDriver from "../modal/administration/driver";
import { AgregarButton } from "../iu/button";

export default function DriverTable() {
  const [data, setData] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const [rowData, setRowData] = useState(null);

  const columns = useMemo(() => [
    {
      accessorKey: "chcodigoconductor",
      header: "CODIGO",
      size: 150,
    },
    {
      accessorKey: "chnombres",
      header: "CONDUCTOR",
      size: 150,
    },
    {
      accessorKey: "chnrodocumento",
      header: "DNI",
      size: 150,
    },
    {
      accessorKey: "chcategoriabrebete",
      header: "CATEGORIA",
      size: 150,
    },
    {
      accessorKey: "chnumerobrebete",
      header: "BREBETE",
      size: 150,
    },
  ]);

  const renderRowActions = ({ closeMenu, row }) => [
    <MenuItem
      onClick={() => {
        closeMenu();
        setRowData(row.original);
        setOpenModal(true);
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
      const driver = await getDriver();
      setData(driver);
    };
    fetchData();
  }, [openModal]);

  return (
    <div>
      <Table
        columns={columns}
        data={data}
        renderRowActionMenuItems={renderRowActions}
        loading={data.length === 0}
        acciones={
          <AgregarButton
            text='Nuevo Conductor'
            className='w-fit text-sm md:text-base'
            onClick={() => setOpenModal(true)}
          />
        }
      />
      {openModal && (
        <ModalDriver
          open={openModal}
          setOpen={setOpenModal}
          title='Conductor'
          rowData={rowData}
          setRowData={setRowData}
        />
      )}
    </div>
  );
}
