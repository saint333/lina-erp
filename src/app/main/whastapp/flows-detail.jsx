import ViewPrincipal from "src/app/components/views";
import { FlowsDetailContent } from "src/app/components/whastapp/flows-deatil";

export default function FlowsDetail() {
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
            title: "Flujos",
          },
          {
            title: "Detalle",
          }
        ],
      }}
      content={<FlowsDetailContent />}
    />
  );
}
