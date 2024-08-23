import Consult from "./consult/page";
import Guide from "./guide/page";

const SalesConfig = {
	routes: [
		{
			path: 'sales/consult',
			element: <Consult />
		},
    {
      path: 'sales/guide',
      element: <Guide />,
    },
	]
};
export default SalesConfig;