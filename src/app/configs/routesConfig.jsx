import LinaUtils from '@lina/utils';
import LinaLoading from '@lina/core/LinaLoading';
import { Navigate } from 'react-router-dom';
import settingsConfig from 'app/configs/settingsConfig';
import SignInConfig from '../main/sign-in/SignInConfig';
import SignUpConfig from '../main/sign-up/SignUpConfig';
import SignOutConfig from '../main/sign-out/SignOutConfig';
import Error404Page from '../main/404/Error404Page';
import DashboardConfig from '../main/dashboard/config';
import MaintenanceConfig from '../main/maintenance/config';
import ManagementConfig from '../main/management/config';
import SalesConfig from '../main/sales/config';
import AdministrationConfig from '../main/administration/config';
import WhastappConfig from '../main/whastapp/config';

const routeConfigs = [
	SignOutConfig,
	SignInConfig,
	SignUpConfig,
	DashboardConfig,
	MaintenanceConfig,
	ManagementConfig,
	SalesConfig,
	AdministrationConfig,
	WhastappConfig
];
/**
 * The routes of the application.
 */
const routes = [
	...LinaUtils.generateRoutesFromConfigs(routeConfigs, settingsConfig.defaultAuth),
	{
		path: '/',
		element: <Navigate to="/dashboard" />,
		auth: settingsConfig.defaultAuth
	},
	{
		path: 'loading',
		element: <LinaLoading />
	},
	{
		path: '404',
		element: <Error404Page />
	},
	{
		path: '*',
		element: <Navigate to="404" />
	}
];
export default routes;
