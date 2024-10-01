import { useSearchParams } from "react-router-dom";
import ViewPrincipal from "src/app/components/views";
import { FlowsDetailContent } from "src/app/components/whastapp/flows-deatil";

export default function FlowsDetail() {
  const [searchParams] = useSearchParams();
  const botId = searchParams.get("bot");
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
            link: `/crm/flows?bot=${botId}`,
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
