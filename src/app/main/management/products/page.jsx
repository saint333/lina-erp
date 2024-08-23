import { Card, CardContent } from "@mui/material";
import KardexTable from "src/app/components/management/products";
import ViewPrincipal from "src/app/components/views";

export default function Products() {
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
            title: "Productos",
          },
        ],
      }}
      content={
        <Card>
          <CardContent>
            <KardexTable product={[]} />
          </CardContent>
        </Card>
      }
    />
  );
}
