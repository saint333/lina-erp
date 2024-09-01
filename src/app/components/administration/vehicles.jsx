import { useEffect, useMemo, useState } from "react";
import Table from "../table";
import { ListItemIcon, ListItemText, MenuItem } from "@mui/material";
import { Edit } from "@mui/icons-material";
import { getVehicles } from "src/app/services/administration/vehicles";
import ModalVehicle from "../modal/administration/vehicles";

export default function VehiclesTable() {
  const [data, setData] = useState([]);
  const [openModal, setOpenModal] = useState(false);

  const columns = useMemo(() => [
    {
      accessorKey: "chcodigovehiculo",
      header: "CODIGO",
      size: 150,
    },
    {
      accessorKey: "chmarca",
      header: "MARCA",
      size: 150,
    },
    {
      accessorKey: "chplaca",
      header: "PLACA",
      size: 150,
    },
  ]);

  const renderRowActions = ({ closeMenu, row }) => [
    <MenuItem
      onClick={() => {
        closeMenu();
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
      const vehicles = await getVehicles();
      setData(vehicles);
    };
    fetchData();
  }, []);

  return (
    <div>
      <Table
        columns={columns}
        data={data}
        renderRowActionMenuItems={renderRowActions}
      />
      {openModal && (
        <ModalVehicle
          open={openModal}
          setOpen={setOpenModal}
          title='Vehiculo añadir'
        />
      )}
    </div>
  );
}
