import { createContext, useCallback, useContext, useMemo } from 'react';
import LinaAuthorization from '@lina/core/LinaAuthorization';
import { useAppDispatch, useAppSelector } from 'app/store/hooks';
import LinaSplashScreen from '@lina/core/LinaSplashScreen/LinaSplashScreen';
import { resetUser, selectUser, selectUserRole, setUser, updateUser } from 'src/app/auth/user/store/userSlice';
import BrowserRouter from '@lina/core/BrowserRouter';
import _ from '@lodash';
import useJwtAuth from './services/jwt/useJwtAuth';
import { baseApi } from '../services';

const AuthContext = createContext({
	isAuthenticated: false
});

function AuthRouteProvider(props) {
	const { children } = props;
	const dispatch = useAppDispatch();
	const user = useAppSelector(selectUser);
	/**
	 * Get user role from store
	 */
	const userRole = useAppSelector(selectUserRole);
	/**
	 * Jwt auth service
	 */
	const jwtService = useJwtAuth({
		config: {
			tokenStorageKey: 'jwt_access_token',
			signInUrl: `${baseApi}/auth/`,
			signUpUrl: 'mock-api/auth/sign-up',
			tokenRefreshUrl: 'mock-api/auth/refresh',
			getUserUrl: 'mock-api/auth/user',
			updateUserUrl: 'mock-api/auth/user',
			updateTokenFromHeader: true
		},
		onSignedIn: (user) => {
			dispatch(setUser(user));
			setAuthService('jwt');
		},
		onSignedUp: (user) => {
			dispatch(setUser(user));
			setAuthService('jwt');
		},
		onSignedOut: () => {
			dispatch(resetUser());
			resetAuthService();
		},
		onUpdateUser: (user) => {
			dispatch(updateUser(user));
		},
		onError: (error) => {
			// eslint-disable-next-line no-console
			console.warn(error);
		}
	});
	/**
	 * Check if services is in loading state
	 */
	const isLoading = useMemo(
		() => jwtService?.isLoading,
		[jwtService?.isLoading]
	);
	/**
	 * Check if user is authenticated
	 */
	const isAuthenticated = useMemo(
		() => jwtService?.isAuthenticated,
		[jwtService?.isAuthenticated]
	);
	/**
	 * Combine auth services
	 */
	const combinedAuth = useMemo(
		() => ({
			jwtService,
			signOut: () => {
				const authService = getAuthService();

				if (authService === 'jwt') {
					return jwtService?.signOut();
				}

				return null;
			},
			updateUser: (userData) => {
				const authService = getAuthService();

				if (authService === 'jwt') {
					return jwtService?.updateUser(userData);
				}

				return null;
			},
			isAuthenticated
		}),
		[isAuthenticated, user]
	);
	/**
	 * Get auth service
	 */
	const getAuthService = useCallback(() => {
		return localStorage.getItem('authService');
	}, []);
	/**
	 * Set auth service
	 */
	const setAuthService = useCallback((authService) => {
		if (authService) {
			localStorage.setItem('authService', authService);
		}
	}, []);
	/**
	 * Reset auth service
	 */
	const resetAuthService = useCallback(() => {
		localStorage.removeItem('authService');
	}, []);

	/**
	 * Render loading screen while loading user data
	 */
	if (isLoading) {
		return <LinaSplashScreen />;
	}

	return (
		<AuthContext.Provider value={combinedAuth}>
			<BrowserRouter>
				<LinaAuthorization userRole={userRole}>{children}</LinaAuthorization>
			</BrowserRouter>
		</AuthContext.Provider>
	);
}

function useAuth() {
	const context = useContext(AuthContext);

	if (!context) {
		throw new Error('useAuth must be used within a AuthRouteProvider');
	}

	return context;
}

export { useAuth, AuthRouteProvider };
