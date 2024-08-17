import { Card, CardContent } from "@mui/material";
import License from "src/app/components/maintenance/client/license";
import ViewPrincipal from "src/app/components/views";

export default function Licenses() {
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
            title: "Licencias",
            href: "/",
          },
        ],
      }}
      content={
        <Card>
          <CardContent>
            <License />
          </CardContent>
        </Card>
      }
    />
  );
}
