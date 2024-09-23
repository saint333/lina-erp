import { Visibility } from "@mui/icons-material";
import { ListItemIcon, ListItemText, MenuItem } from "@mui/material";
import { useEffect, useMemo, useState } from "react";
import Table from "../../table";
import { ExhibitionModal } from "../../modal/management/exhibition";
import { getExhibition } from "src/app/services/management/exhibition";

export default function ExhibitionTable() {
  const [data, setData] = useState([]);
  const [openModal, setOpenModal] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      const response = await getExhibition();
      setData(response);
    };
    fetchData();
  }, []);

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
        setOpenModal(true);
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
        loading={data.length === 0}
      />
      {openModal && (
        <ExhibitionModal
          open={openModal}
          setOpen={setOpenModal}
          title='Mantenimiento de tarjeta'
        />
      )}
    </div>
  );
}
