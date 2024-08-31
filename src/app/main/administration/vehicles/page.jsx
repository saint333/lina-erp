import { Card, CardContent } from "@mui/material";
import VehiclesTable from "src/app/components/administration/vehicles";
import ViewPrincipal from "src/app/components/views";

export default function Vehicles() {
  return (
    <ViewPrincipal
      header={{
        breadcrumbs: [
          {
            title: "Inicio",
            link: "/dashboard",
          },
          {
            title: "Administración",
          },
          {
            title: "Vehículos",
          },
        ],
      }}
      content={
        <Card>
          <CardContent>
            <VehiclesTable />
          </CardContent>
        </Card>
      }
    />
  );
}