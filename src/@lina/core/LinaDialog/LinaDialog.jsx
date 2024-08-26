import Dialog from '@mui/material/Dialog';
import { useAppDispatch, useAppSelector } from 'app/store/hooks';
import { closeDialog, selectLinaDialogProps } from '@lina/core/LinaDialog/linaDialogSlice';

/**
 * LinaDialog component
 * This component renders a material UI ```Dialog``` component
 * with properties pulled from the redux store
 */
function LinaDialog() {
	const dispatch = useAppDispatch();
	const options = useAppSelector(selectLinaDialogProps);
	return (
		<Dialog
			onClose={() => dispatch(closeDialog())}
			aria-labelledby="lina-dialog-title"
			classes={{
				paper: 'rounded-8'
			}}
			{...options}
		/>
	);
}

export default LinaDialog;
