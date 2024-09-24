import { Card, CardContent } from "@mui/material";
import ViewPrincipal from "src/app/components/views";
import { ContactTable } from "src/app/components/whastapp/contact";

export default function Contacts() {
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
            title: "Contactos",
          },
        ],
      }}
      content={
        <Card>
          <CardContent>
            <ContactTable />
          </CardContent>
        </Card>
      }
    />
  );
}
