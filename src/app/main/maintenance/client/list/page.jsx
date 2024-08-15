import { Card, CardContent } from "@mui/material";
import ClientList from "src/app/components/maintenance/client";

export default function List() {
  return (
    <Card>
      <CardContent>
        <ClientList />
      </CardContent>
    </Card>
  )
}
