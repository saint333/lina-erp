import ClientConfig from "./client/config";
import Product from "./products/page";
import Suppliers from "./suppliers/page";

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
    ...ClientConfig
	]
};
export default MaintenanceConfig;