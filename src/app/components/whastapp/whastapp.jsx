import { useEffect, useMemo, useState } from "react";
import Table from "../table";
import { List } from "src/app/services/maintenance/client";
import { SendButton } from "../iu/button";
import { TextField } from "@mui/material";

export const WhastappTable = () => {
  const [data, setData] = useState([]);
  const [selectedRow, setSelectedRow] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const product = await List();
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
        header: "N DOCUMENTO",
        size: 150,
      },
      {
        accessorKey: "chdireccion",
        header: "DIRECCIÓN",
        size: 250,
      },
      {
        accessorKey: "chtelefono",
        header: "TELEFONO",
        size: 150,
      },
    ],
    []
  );

  return (
    <div className='flex gap-7 items-start'>
      <div className='md:w-8/12 grid'>
        <Table
          enableRowSelection={true}
          columns={columns}
          data={data}
          loading={data.length === 0}
          // onRowSelectionChange={(selectedRows) => {
          //   console.log("🚀 ~ WhastappTable ~ selectedRows:", selectedRows())
          //   setSelectedRow(selectedRows);
          // }}
        />
      </div>
      <div className='md:w-4/12'>
        <div className='flex gap-6 flex-col'>
          <TextField label='Outlined' variant='outlined' size='small' />
          <SendButton text='Enviar' onClick={() => console.log(selectedRow)}/>
        </div>
      </div>
    </div>
  );
};
