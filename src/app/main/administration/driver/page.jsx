import { Card, CardContent } from '@mui/material'
import DriverTable from 'src/app/components/administration/driver'
import ViewPrincipal from 'src/app/components/views'

export default function Driver() {
  return (
    <ViewPrincipal
      header={{
        breadcrumbs: [
          {
            title: 'Inicio',
            link: '/dashboard',
          },
          {
            title: 'Administración',
          },
          {
            title: 'Conductores',
          },
        ],
      }}
      content={
        <Card>
          <CardContent>
            <DriverTable />
          </CardContent>
        </Card>
      }
    
    />
  )
}
