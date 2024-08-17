import { Card, CardContent } from "@mui/material";
import ResolutionCard from "src/app/components/maintenance/client/resolution";
import ViewPrincipal from "src/app/components/views";

export default function Resolution() {
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
            <ResolutionCard />
          </CardContent>
        </Card>
      }
    />
  );
}
