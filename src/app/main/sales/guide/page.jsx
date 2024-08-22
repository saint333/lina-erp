import { Card, CardContent } from "@mui/material";
import GuideTable from "src/app/components/sales/guide";

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

export default function Guide() {
  return (
    <Card>
      <CardContent>
        <GuideTable product={[]}/>
      </CardContent>
    </Card>
  )
}
