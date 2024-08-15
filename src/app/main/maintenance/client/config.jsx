import CardTarjeta from "./card/page";
import Licenses from "./license/page";
import List from "./list/page";
import Resolution from "./resolution/page";

const ClientConfig = [
  {
    path: "maintenance/client/list",
    element: <List />,
  },
	{
		path: "maintenance/client/card",
		element: <CardTarjeta />,
	},
	{
		path: "maintenance/client/license",
		element: <Licenses />,
	},
	{
		path: "maintenance/client/resolution",
		element: <Resolution />,
	}
];
export default ClientConfig;
