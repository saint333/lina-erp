import {
  Autocomplete,
  Button,
  Card,
  CardContent,
  Divider,
  TextField,
} from "@mui/material";
import { useMemo } from "react";
import { useForm } from "react-hook-form";
import SaveIcon from "@mui/icons-material/Save";
import { CustomInput, CustomSelect } from "@/ui/Form";
import Table from "src/app/components/table";

export default function Quick() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    console.log("🚀 ~ onSubmit ~ data:", data);
  };

  const columns = useMemo(
    () => [
      {
        accessorKey: "name.firstName", //access nested data with dot notation
        header: "First Name",
        size: 150,
      },
      {
        accessorKey: "name.lastName",
        header: "Last Name",
        size: 150,
      },
      {
        accessorKey: "address", //normal accessorKey
        header: "Address",
        size: 200,
      },
      {
        accessorKey: "city",
        header: "City",
        size: 150,
      },
      {
        accessorKey: "state",
        header: "State",
        size: 150,
      },
    ],
    []
  );

  return (
    <div className='grid grid-cols-1 lg:grid-cols-[1.5fr_1fr] gap-6 grid-rows-[auto] items-start'>
      <Card>
        <CardContent>
          <Autocomplete
            disablePortal
            id='combo-box-demo'
            options={["Movie 1", "Movie 2", "Movie 3"]}
            size='small'
            fullWidth
            noOptionsText='No hay opciones'
            renderInput={(params) => <TextField {...params} label='Movie' />}
          />
          <Table columns={columns} enableGlobalFilter={false} />
        </CardContent>
      </Card>
      <div className='flex flex-col gap-3'>
        <Card>
          <CardContent>
            <div className='flex gap-3 flex-col'>
              <div className='flex gap-3 flex-col md:flex-row'>
                {/* <CustomSelect
                  register={register}
                  errors={errors}
                  label={"Tipo de Compra"}
                  textKey={"document"}
                  options={["DNI", "RUC"]}
                />
                <CustomInput
                  label={"Correlativo"}
                  register={register}
                  errors={errors}
                  textKey={"number"}
                /> */}
              </div>
              <div className='flex gap-3 flex-col md:flex-row'>
                {/* <CustomInput
                  label={"Fecha de Emisión"}
                  register={register}
                  errors={errors}
                  textKey={"date"}
                  type='date'
                  InputLabelProps={{ shrink: true }}
                />
                <CustomInput
                  label={"Fecha de Ingreso"}
                  register={register}
                  errors={errors}
                  textKey={"dateIncome"}
                  type='date'
                  InputLabelProps={{ shrink: true }}
                /> */}
              </div>
              <div className='flex gap-3 flex-col md:flex-row'>
                {/* <CustomSelect
                  register={register}
                  errors={errors}
                  label={"Moneda"}
                  textKey={"currency"}
                  options={["PEN", "USD"]}
                />
                <CustomInput
                  errors={errors}
                  register={register}
                  label={"Tipo cambio"}
                  textKey={"exchange"}
                />
                <CustomInput
                  errors={errors}
                  register={register}
                  label={"IGV"}
                  textKey={"igv"}
                /> */}
              </div>
              {/* <Autocomplete
                disablePortal
                id='combo-box-client'
                options={["Movie 1", "Movie 2", "Movie 3"]}
                size='small'
                fullWidth
                noOptionsText='No hay opciones'
                renderInput={(params) => (
                  <CustomInput
                    label={"Proveedor RUC/DNI/OTROS"}
                    register={register}
                    errors={errors}
                    textKey={"client"}
                    {...params}
                  />
                )}
              /> */}
              <div className='flex gap-3 flex-col md:flex-row'>
                {/* <CustomSelect
                  register={register}
                  errors={errors}
                  label={"Factura o Boleta"}
                  textKey={"license"}
                  options={["Boleta", "Factura"]}
                />
                <CustomInput
                  label={"Guia de Remision"}
                  register={register}
                  errors={errors}
                  textKey={"referralGuide"}
                /> */}
                <div className='w-full hidden md:block'></div>
              </div>
            </div>
            <Divider className='!my-3' />
            <p className='flex justify-between'>
              <span>Sub Total</span>
              <span>S/ 0.00</span>
            </p>
            <p className='flex justify-between'>
              <span>Total Descuento</span>
              <span>S/ 0.00</span>
            </p>
            <p className='flex justify-between'>
              <span>Valor Venta</span>
              <span>S/ 0.00</span>
            </p>
            <p className='flex justify-between'>
              <span>IGV</span>
              <span>S/ 0.00</span>
            </p>
          </CardContent>
        </Card>
        <Card className='border-t-4 border-teal-500'>
          <CardContent>
            <div className='flex justify-between'>
              <div className='flex flex-col'>
                <span style={{ color: "#74829c" }}>Total Compra</span>
                <span>S/ 0.00</span>
              </div>
              <Button
                color='success'
                endIcon={<SaveIcon />}
                variant='contained'
                onClick={handleSubmit(onSubmit)}
              >
                Procesar Compra
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
