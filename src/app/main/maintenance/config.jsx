import ClientConfig from "./client/config";
import Product from "./products/page";
import Suppliers from "./suppliers/page";
import Various from "./various_maintenance/page";

const MaintenanceConfig = {
	routes: [
		{
			path: 'maintenance/products',
			element: <Product />
		},
    {
      path: 'maintenance/suppliers',
      element: <Suppliers />,
    },
		{
      path: 'maintenance/various',
      element: <Various />,
    },
    ...ClientConfig
	]
};
export default MaintenanceConfig;