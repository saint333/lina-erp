import { Card, CardContent } from "@mui/material";
import ExhibitionTable from "src/app/components/management/exhibition";
import ViewPrincipal from "src/app/components/views";

export default function Exhibition() {
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
            title: "Exhibición",
          },
        ],
      }}
      content={
        <Card>
          <CardContent>
            <ExhibitionTable product={[]} />
          </CardContent>
        </Card>
      }
    />
  );
}
