import { Card, CardContent } from "@mui/material";
import GuideTable from "src/app/components/sales/guide";
import ViewPrincipal from "src/app/components/views";

export default function Guide() {
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
            title: "Guías",
          },
        ],
      }}
      content={
        <Card>
          <CardContent>
            <GuideTable product={[]} />
          </CardContent>
        </Card>
      }
    />
  );
}
