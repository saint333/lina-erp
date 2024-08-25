import FuseLayout from '@fuse/core/FuseLayout';
import FuseTheme from '@fuse/core/FuseTheme';
import { SnackbarProvider } from 'notistack';
import { selectCurrentLanguageDirection } from 'app/store/i18nSlice';
import themeLayouts from 'app/theme-layouts/themeLayouts';
import { selectMainTheme } from '@fuse/core/FuseSettings/fuseSettingsSlice';
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
				<FuseTheme
					theme={mainTheme}
					direction={langDirection}
				>
					<AuthRouteProvider>
						<SnackbarProvider
							maxSnack={4}
							anchorOrigin={{
								vertical: 'bottom',
								horizontal: 'right'
							}}
							classes={{
								containerRoot: 'bottom-0 right-0 mb-52 md:mb-68 mr-8 lg:mr-80 z-99'
							}}
						>
							<FuseLayout layouts={themeLayouts} />
						</SnackbarProvider>
					</AuthRouteProvider>
				</FuseTheme>
	);
}

export default withAppProviders(App);
