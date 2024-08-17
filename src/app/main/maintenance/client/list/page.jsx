import { Card, CardContent } from "@mui/material";
import ClientList from "src/app/components/maintenance/client";
import ViewPrincipal from "src/app/components/views";

export default function List() {
  return (
    <ViewPrincipal
      header={{
        // title: "Clientes",
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
            title: "Clientes",
            href: "/",
          },
        ],
      }}
      content={
        <Card>
          <CardContent>
            <ClientList />
          </CardContent>
        </Card>
      }
    />
  );
}
