import Bots from "./bots";
import Contacts from "./contact";
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
    }
	]
};
export default WhastappConfig;