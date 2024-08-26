import { combineSlices } from '@reduxjs/toolkit';
import { linaSettingsSlice } from '@lina/core/LinaSettings/linaSettingsSlice';
import { i18nSlice } from 'app/store/i18nSlice';
import apiService from './apiService';
import { userSlice } from '../auth/user/store/userSlice';
// `combineSlices` automatically combines the reducers using
// their `reducerPath`s, therefore we no longer need to call `combineReducers`.
export const rootReducer = combineSlices(
	/**
	 * Static slices
	 */
	userSlice,
	linaSettingsSlice,
	i18nSlice,
	/**
	 * Dynamic slices
	 */
	{
		[apiService.reducerPath]: apiService.reducer
	}
).withLazyLoadedSlices();
