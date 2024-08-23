import { Card, CardContent } from "@mui/material";
import EntryTable from "src/app/components/management/entry";
import ViewPrincipal from "src/app/components/views";

export default function Entry() {
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
            title: "Entradas",
          },
        ],
      }}
      content={
        <Card>
          <CardContent>
            <EntryTable product={[]} />
          </CardContent>
        </Card>
      }
    />
  );
}
