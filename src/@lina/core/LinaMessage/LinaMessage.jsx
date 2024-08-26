import { amber, blue, green } from '@mui/material/colors';
import { styled } from '@mui/material/styles';
import IconButton from '@mui/material/IconButton';
import Snackbar from '@mui/material/Snackbar';
import SnackbarContent from '@mui/material/SnackbarContent';
import Typography from '@mui/material/Typography';
import { memo } from 'react';
import { hideMessage, selectLinaMessageOptions, selectLinaMessageState } from '@lina/core/LinaMessage/linaMessageSlice';
import { useAppDispatch, useAppSelector } from 'app/store/hooks';
import LinaSvgIcon from '../LinaSvgIcon';

const StyledSnackbar = styled(Snackbar)(({ theme, variant }) => ({
	'& .LinaMessage-content': {
		...(variant === 'success' && {
			backgroundColor: green[600],
			color: '#FFFFFF'
		}),
		...(variant === 'error' && {
			backgroundColor: theme.palette.error.dark,
			color: theme.palette.getContrastText(theme.palette.error.dark)
		}),
		...(variant === 'info' && {
			backgroundColor: blue[600],
			color: '#FFFFFF'
		}),
		...(variant === 'warning' && {
			backgroundColor: amber[600],
			color: '#FFFFFF'
		})
	}
}));
const variantIcon = {
	success: 'check_circle',
	warning: 'warning',
	error: 'error_outline',
	info: 'info'
};

/**
 * LinaMessage
 * The LinaMessage component holds a snackbar that is capable of displaying message with 4 different variant. It uses the @mui/material React packages to create the components.
 */
function LinaMessage() {
	const dispatch = useAppDispatch();
	const state = useAppSelector(selectLinaMessageState);
	const options = useAppSelector(selectLinaMessageOptions);
	return (
		<StyledSnackbar
			{...options}
			open={state}
			onClose={() => dispatch(hideMessage())}
		>
			<SnackbarContent
				className="LinaMessage-content"
				message={
					<div className="flex items-center">
						{variantIcon[options.variant] && (
							<LinaSvgIcon color="inherit">{variantIcon[options.variant]}</LinaSvgIcon>
						)}
						<Typography className="mx-8">{options.message}</Typography>
					</div>
				}
				action={[
					<IconButton
						key="close"
						aria-label="Close"
						color="inherit"
						onClick={() => dispatch(hideMessage())}
						size="large"
					>
						<LinaSvgIcon>heroicons-outline:x</LinaSvgIcon>
					</IconButton>
				]}
			/>
		</StyledSnackbar>
	);
}

export default memo(LinaMessage);
