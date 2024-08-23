import { Card, CardContent } from "@mui/material";
import ConsultTable from "src/app/components/sales/consult";
import ViewPrincipal from "src/app/components/views";

export default function Consult() {
  return (
    <ViewPrincipal
      header={{
        breadcrumbs: [
          {
            title: "Inicio",
            link: "/dashboard",
          },
          {
            title: "Ventas",
          },
          {
            title: "Consultas",
          },
        ],
      }}
      content={
        <Card>
          <CardContent>
            <ConsultTable product={[]} />
          </CardContent>
        </Card>
      }
    />
  );
}
