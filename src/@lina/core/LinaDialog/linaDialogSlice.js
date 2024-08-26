import { createSlice } from '@reduxjs/toolkit';
import { rootReducer } from 'app/store/lazyLoadedSlices';
/**
 * The initial state of the dialog slice.
 */
const initialState = {
	open: false,
	children: ''
};
/**
 * The Lina Dialog slice
 */
export const linaDialogSlice = createSlice({
	name: 'linaDialog',
	initialState,
	reducers: {
		openDialog: (state, action) => {
			state.open = true;
			state.children = action.payload.children;
		},
		closeDialog: () => initialState
	},
	selectors: {
		selectLinaDialogState: (linaDialog) => linaDialog.open,
		selectLinaDialogProps: (linaDialog) => linaDialog
	}
});
/**
 * Lazy load
 * */
rootReducer.inject(linaDialogSlice);
const injectedSlice = linaDialogSlice.injectInto(rootReducer);
export const { closeDialog, openDialog } = linaDialogSlice.actions;
export const { selectLinaDialogState, selectLinaDialogProps } = injectedSlice.selectors;
export default linaDialogSlice.reducer;
