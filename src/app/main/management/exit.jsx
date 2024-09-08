import { Card, CardContent } from "@mui/material";
import ExitTable from "src/app/components/management/exit";
import ViewPrincipal from "src/app/components/views";

export default function Exit() {
  return (
    <ViewPrincipal
      header={{
        breadcrumbs: [
          {
            title: "Inicio",
            link: "/dashboard",
          },
          {
            title: "Gestión",
          },
          {
            title: "Salida",
          },
        ],
      }}
      content={
        <Card>
          <CardContent>
            <ExitTable product={[]} />
          </CardContent>
        </Card>
      }
    />
  );
}
