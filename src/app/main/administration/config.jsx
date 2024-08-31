import Carrier from "./carrier/page";
import Driver from "./driver/page";
import Vehicles from "./vehicles/page";

const AdministrationConfig = {
	routes: [
		{
			path: 'administration/carrier',
			element: <Carrier />
		},
    {
      path: 'administration/vehicles',
      element: <Vehicles />
    },
    {
      path: 'administration/driver',
      element: <Driver />
    }
	]
};
export default AdministrationConfig;