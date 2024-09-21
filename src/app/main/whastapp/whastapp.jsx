import { Card, CardContent } from "@mui/material";
import ViewPrincipal from "src/app/components/views";
import { WhastappTable } from "src/app/components/whastapp/whastapp";

export default function Whastapp() {
  return (
    <ViewPrincipal
      header={{
        breadcrumbs: [
          {
            title: "Inicio",
            link: "/dashboard",
          },
          {
            title: "Crm",
          },
          {
            title: "Whatsapp",
          },
        ],
      }}
      content={
        <Card>
          <CardContent>
            <WhastappTable />
          </CardContent>
        </Card>
      }
    />
  );
}
