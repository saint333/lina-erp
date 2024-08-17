import { styled } from '@mui/material/styles';

const Root = styled('div')(({ theme }) => ({
	'& > .logo-icon': {
		transition: theme.transitions.create(['width', 'height'], {
			duration: theme.transitions.duration.shortest,
			easing: theme.transitions.easing.easeInOut
		})
	},
	'& > .badge': {
		transition: theme.transitions.create('opacity', {
			duration: theme.transitions.duration.shortest,
			easing: theme.transitions.easing.easeInOut
		})
	}
}));

/**
 * The logo component.
 */
function Logo() {
	return (
		<Root className="flex items-center">
			<img
				className="logo-icon h-32 w-32"
				src="assets/images/logo/icon-lina-dark.png"
				alt="logo"
			/>
			<div className="flex px-16 items-center">
					<span className="font-semibold text-2xl">LINAERP</span>
			</div>
		</Root>
	);
}

export default Logo;
