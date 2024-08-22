import { Card, CardContent } from "@mui/material";
import ConsultTable from "src/app/components/sales/consult";

// const Data = async () => {
//   const session = await auth();
//   const responde = await fetch(process.env.URL_API + "/maintenance/client/card",
//     {
//       method: "GET",
//       cache: "no-store",
//       headers: {
//         Authorization: `JWT ${session.user.token_acceso}`,
//       },
//     }
//   );
//   const lists = await responde.json();
//   return lists
// };

export default function Consult() {
  return (
    <Card>
      <CardContent>
        <ConsultTable product={[]}/>
      </CardContent>
    </Card>
  )
}
