import { Card, CardContent } from "@mui/material";
import ProductsList from "src/app/components/maintenance/products";

export default function Product() {
  return (
    <Card>
      <CardContent>
        <ProductsList />
      </CardContent>
    </Card>
  );
}
