import { Card, CardContent } from "@mui/material";
import CardLicense from "src/app/components/maintenance/client/card";
import ViewPrincipal from "src/app/components/views";

export default function CardTarjeta() {
  return (
    <ViewPrincipal 
      header={{
        // title: "Productos",
        breadcrumbs: [
          {
            title: "Inicio",
            href: "/",
          },
          {
            title: "Mantenimiento",
            href: "/",
          },
          {
            title: "Productos",
            href: "/",
          },
        ],
      }}
      content={
        <Card>
          <CardContent>
            <CardLicense />
          </CardContent>
        </Card>
      }
    />
  )
}
