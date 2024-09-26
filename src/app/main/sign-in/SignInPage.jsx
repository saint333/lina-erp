import Typography from '@mui/material/Typography';
import { Link } from 'react-router-dom';
import AvatarGroup from '@mui/material/AvatarGroup';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import CardContent from '@mui/material/CardContent';
import _ from '@lodash';
import Button from '@mui/material/Button';
import LinaSvgIcon from '@lina/core/LinaSvgIcon';
import JwtLoginTab from './tabs/JwtSignInTab';


/**
 * The sign in page.
 */
function SignInPage() {
	return (
		<div className="flex min-w-0 flex-1 flex-col items-center sm:flex-row sm:justify-center md:items-start md:justify-start max-h-screen">
			<Paper className="h-full w-full px-16 py-8 ltr:border-r-1 rtl:border-l-1 sm:h-auto sm:w-auto sm:rounded-2xl sm:p-48 sm:shadow md:flex md:h-full md:w-1/2 md:items-center md:justify-end md:rounded-none md:p-64 md:shadow-none">
				<CardContent className="mx-auto w-full max-w-320 sm:mx-0 sm:w-320">
					<div className='flex items-end gap-5'>
					<img
						className="w-48"
						// src="assets/images/logo/logo.svg"
						src="assets/images/logo/icon-lina-dark.png"
						alt="logo"
					/>
						<Typography className='text-4xl font-500' color='secondary'>LINA ERP</Typography>
					</div>
					<Typography className="mt-32 text-4xl font-extrabold leading-tight tracking-tight">
						Iniciar sesión
					</Typography>
					{/* <div className="mt-2 flex items-baseline font-medium">
						<Typography>Don't have an account?</Typography>
						<Link
							className="ml-4"
							to="/sign-up"
						>
							Sign up
						</Link>
					</div> */}

          <JwtLoginTab />

				</CardContent>
			</Paper>

			<Box
				className="relative hidden h-full flex-auto items-center justify-center overflow-hidden p-64 md:flex lg:px-112"
				sx={{ backgroundColor: 'primary.main' }}
			>
				{/* <img src="assets/images/logo/banner.png" className=""/> */}
				<div className="relative z-10 w-full max-w-2xl">
				<img src="assets/images/logo/banner.png" className="animate-bounce-up-down"/>
					{/* <div className="text-7xl font-bold leading-none text-gray-100">
						<div>Welcome to</div>
						<div>our community</div>
					</div> */}
					<div className="mt-24 text-lg leading-6 tracking-tight text-gray-400">
						{/* Lina helps developers to build organized and well coded dashboards full of beautiful and rich
						modules. Join us and start building your application today. */}
						¡<b>Lina ERP</b> unifica todos tus procesos! Gestiona facturación, control de inventario, ecommerce, CRM y WhatsApp en un solo sistema, potenciado por inteligencia artificial.
					</div>
				</div>
			</Box>
		</div>
	);
}

export default SignInPage;
