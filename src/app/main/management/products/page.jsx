import { Card, CardContent } from "@mui/material";
import KardexTable from "src/app/components/management/products";

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

export default function Products() {

  return (
    <Card>
      <CardContent>
        <KardexTable product={[]}/>
      </CardContent>
    </Card>
  )
}
