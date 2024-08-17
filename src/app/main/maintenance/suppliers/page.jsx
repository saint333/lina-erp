import { Card, CardContent } from "@mui/material";
import Supplier from "src/app/components/maintenance/suppliers";
import ViewPrincipal from "src/app/components/views";

export default function Suppliers() {
  return (
    <ViewPrincipal
      header={{
        // title: "Proveedores",
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
            title: "Proveedores",
            href: "/",
          },
        ],
      }}
      content={
        <Card>
          <CardContent>
            <Supplier />
          </CardContent>
        </Card>
      }
    />
  );
}
