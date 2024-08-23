import Entry from "./entry/page";
import Exhibition from "./exhibition/page";
import Products from "./products/page";

const ManagementConfig = {
	routes: [
		{
			path: 'management/products',
			element: <Products />
		},
    {
      path: 'management/exhibition',
      element: <Exhibition />,
    },
    {
      path: 'management/entry',
      element: <Entry />,
    }
	]
};
export default ManagementConfig;