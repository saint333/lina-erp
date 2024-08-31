import { Card, CardContent } from "@mui/material";
import CarrierTable from "src/app/components/administration/carrier";
import ViewPrincipal from "src/app/components/views";

export default function Carrier() {
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
            title: "Trasportistas",
          },
        ],
      }}
      content={
        <Card>
          <CardContent>
            <CarrierTable />
          </CardContent>
        </Card>
      }
    />
  );
}
