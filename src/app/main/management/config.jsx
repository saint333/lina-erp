import Entry from "./entry/page";
import Exhibition from "./exhibition/page";
import Exit from "./exit";
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
    },
    {
      path: 'management/exit',
      element: <Exit />,
    }
	]
};
export default ManagementConfig;