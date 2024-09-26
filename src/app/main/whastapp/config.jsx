import Bots from "./bots";
import Contacts from "./contact";
import Flows from "./flows";
import FlowsDetail from "./flows-detail";
import Whastapp from "./whastapp";

const WhastappConfig = {
	routes: [
		{
			path: 'crm/whastapp',
			element: <Whastapp />
		},
    {
      path: 'crm/bots',
      element: <Bots />
    },
    {
      path: 'crm/contact',
      element: <Contacts />
    },
    {
      path: 'crm/flows',
      element: <Flows />
    },
    {
      path: 'crm/flows-detail',
      element: <FlowsDetail />
    }
	]
};
export default WhastappConfig;