import { Card, CardContent } from "@mui/material";
import ExhibitionTable from "src/app/components/management/exhibition";

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

export default function Exhibition() {

  return (
    <Card>
      <CardContent>
        <ExhibitionTable product={[]}/>
      </CardContent>
    </Card>
  )
}
