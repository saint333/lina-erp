import LinaLayout from '@lina/core/LinaLayout';
import LinaTheme from '@lina/core/LinaTheme';
import { SnackbarProvider } from 'notistack';
import { selectCurrentLanguageDirection } from 'app/store/i18nSlice';
import themeLayouts from 'app/theme-layouts/themeLayouts';
import { selectMainTheme } from '@lina/core/LinaSettings/linaSettingsSlice';
import { useAppSelector } from 'app/store/hooks';
import { useSelector } from 'react-redux';
import withAppProviders from './withAppProviders';
import { AuthRouteProvider } from './auth/AuthRouteProvider';
// import axios from 'axios';
/**
 * Axios HTTP Request defaults
 */
// axios.defaults.baseURL = "";
// axios.defaults.headers.common['Access-Control-Allow-Origin'] = '*';
// axios.defaults.headers.common['Content-Type'] = 'application/x-www-form-urlencoded';

/**
 * The main App component.
 */
function App() {
	/**
	 * The language direction from the Redux store.
	 */
	const langDirection = useAppSelector(selectCurrentLanguageDirection);
	/**
	 * The main theme from the Redux store.
	 */
	const mainTheme = useSelector(selectMainTheme);
	return (
				<LinaTheme
					theme={mainTheme}
					direction={langDirection}
				>
					<AuthRouteProvider>
						<SnackbarProvider
							maxSnack={4}
							anchorOrigin={{
								vertical: 'top',
								horizontal: 'right'
							}}
							classes={{
								containerRoot: 'top-0 right-0 mt-52 md:mt-68 mr-8 lg:mr-80 z-99'
							}}
						>
							<LinaLayout layouts={themeLayouts} />
						</SnackbarProvider>
					</AuthRouteProvider>
				</LinaTheme>
	);
}

export default withAppProviders(App);
