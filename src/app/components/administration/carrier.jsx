import { useEffect, useMemo, useState } from "react";
import Table from "../table";
import { ListItemIcon, ListItemText, MenuItem } from "@mui/material";
import { Edit } from "@mui/icons-material";
import { getCarrier } from "src/app/services/administration/carrier";
import ModalCarrier from "../modal/administration/carrier";
import { AgregarButton } from "../iu/button";

export default function CarrierTable() {
  const [data, setData] = useState([]);
  const [openModal, setOpenModal] = useState(false);

  const columns = useMemo(() => [
    {
      accessorKey: "chcodigotransportista",
      header: "CODIGO",
      size: 150,
    },
    {
      accessorKey: "chrazonsocial",
      header: "RAZON SOCIAL",
      size: 150,
    },
    {
      accessorKey: "chruc",
      header: "RUC",
      size: 150,
    },
    {
      accessorKey: "chtelefono",
      header: "TELEFONO",
      size: 150,
    },
    {
      accessorKey: "chdireccion",
      header: "DIRECCION",
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
      const carrier = await getCarrier();
      setData(carrier);
    };
    fetchData();
  }, []);

  return (
    <div>
      <Table
        columns={columns}
        data={data}
        renderRowActionMenuItems={renderRowActions}
        loading={data.length === 0}
        acciones={
          <AgregarButton
            text='Nuevo Trasportista'
            className='w-fit text-sm md:text-base'
            onClick={() => setOpenModal(true)}
          />
        }
      />
      {openModal && (
        <ModalCarrier
          open={openModal}
          setOpen={setOpenModal}
          title='Transportista'
        />
      )}
    </div>
  );
}
