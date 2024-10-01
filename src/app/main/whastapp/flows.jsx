import ViewPrincipal from "src/app/components/views";
import { FlowsContent } from "src/app/components/whastapp/flows";

export default function Flows() {
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
            link: "/crm/bots",
          },
          {
            title: "Flujos",
          },
        ],
      }}
      content={<FlowsContent />}
    />
  );
}
