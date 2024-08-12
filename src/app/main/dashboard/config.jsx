import { authRoles } from "src/app/auth";
import Dashboard from "./Dashboard";

const DashboardConfig = {
	settings: {
		layout: {
			config: {
				footer: {
					display: false
				},
			}
		}
	},
	routes: [
		{
			path: 'dashboard',
			element: <Dashboard />
		}
	]
};
export default DashboardConfig;