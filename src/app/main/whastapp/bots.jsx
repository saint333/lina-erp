import { Card, CardContent } from "@mui/material";
import ViewPrincipal from "src/app/components/views";
import { BotsContent } from "src/app/components/whastapp/bots";

export default function Bots() {
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
            title: "Bots",
          },
        ],
      }}
      content={<BotsContent />}
    />
  );
}
