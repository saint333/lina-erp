import { Card, CardContent } from "@mui/material";
import ProductsList from "src/app/components/maintenance/products";
import ViewPrincipal from "src/app/components/views";

export default function Product() {
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
            <ProductsList />
          </CardContent>
        </Card>
      }
    />
  );
}
