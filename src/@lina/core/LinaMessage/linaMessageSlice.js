import { createSlice } from '@reduxjs/toolkit';
import { rootReducer } from 'app/store/lazyLoadedSlices';
/**
 * The initial state of the message slice.
 */
const initialState = {
	state: false,
	options: {
		variant: 'info',
		anchorOrigin: {
			vertical: 'top',
			horizontal: 'center'
		},
		autoHideDuration: 2000,
		message: 'Hi'
	}
};
/**
 * The Message slice.
 */
export const linaMessageSlice = createSlice({
	name: 'linaMessage',
	initialState,
	reducers: {
		showMessage(state, action) {
			state.state = true;
			state.options = {
				...initialState.options,
				...action.payload
			};
		},
		hideMessage(state) {
			state.state = false;
		}
	},
	selectors: {
		selectLinaMessageState: (linaMessage) => linaMessage.state,
		selectLinaMessageOptions: (linaMessage) => linaMessage.options
	}
});
/**
 * Lazy load
 * */
rootReducer.inject(linaMessageSlice);
const injectedSlice = linaMessageSlice.injectInto(rootReducer);
export const { hideMessage, showMessage } = linaMessageSlice.actions;
export const { selectLinaMessageOptions, selectLinaMessageState } = injectedSlice.selectors;
export default linaMessageSlice.reducer;
