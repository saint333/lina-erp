import { Card, CardContent } from "@mui/material";
import VariousMaintenance from "src/app/components/maintenance/various_maintenance";
import ViewPrincipal from "src/app/components/views";

export default function Various() {
  return (
    <ViewPrincipal
      header={{
        breadcrumbs: [
          {
            title: "Inicio",
            link: "/dashboard",
          },
          {
            title: "Mantenimiento",
          },
          {
            title: "Varios",
          },
        ],
      }}
      content={
        <Card>
          <CardContent>
            <VariousMaintenance />
          </CardContent>
        </Card>
      }
    />
  );
}
