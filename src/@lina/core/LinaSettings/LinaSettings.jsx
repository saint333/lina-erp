import { useDebounce, usePrevious } from '@lina/hooks';
import { styled } from '@mui/material/styles';
import { Controller, useForm } from 'react-hook-form';
import themeLayoutConfigs from 'app/theme-layouts/themeLayoutConfigs';
import _ from '@lodash';
import TextField from '@mui/material/TextField';
import FormControl from '@mui/material/FormControl';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormLabel from '@mui/material/FormLabel';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import Switch from '@mui/material/Switch';
import Typography from '@mui/material/Typography';
import { memo, useCallback, useEffect, useMemo } from 'react';
import { selectLinaCurrentSettings, setDefaultSettings } from '@lina/core/LinaSettings/linaSettingsSlice';
import { selectUser } from 'src/app/auth/user/store/userSlice';
import { useAppDispatch, useAppSelector } from 'app/store/hooks';
import { showMessage } from '@lina/core/LinaMessage/linaMessageSlice';
import PaletteSelector from './palette-generator/PaletteSelector';
import SectionPreview from './palette-generator/SectionPreview';
/**
 * The Root styled component is used to style the root div of the LinaSettings component.
 * It uses the styled function from the MUI styles library to create a styled component.
 */
const Root = styled('div')(({ theme }) => ({
	'& .LinaSettings-formControl': {
		margin: '6px 0',
		width: '100%',
		'&:last-child': {
			marginBottom: 0
		}
	},
	'& .LinaSettings-group': {},
	'& .LinaSettings-formGroupTitle': {
		position: 'absolute',
		top: -10,
		left: 8,
		fontWeight: 600,
		padding: '0 4px',
		backgroundColor: theme.palette.background.paper
	},
	'& .LinaSettings-formGroup': {
		position: 'relative',
		border: `1px solid ${theme.palette.divider}`,
		borderRadius: 2,
		padding: '12px 12px 0 12px',
		margin: '24px 0 16px 0',
		'&:first-of-type': {
			marginTop: 16
		}
	}
}));

/**
 * The LinaSettings component is responsible for rendering the settings form for the Lina React application.
 * It uses the useForm hook from the react-hook-form library to handle form state and validation.
 * It also uses various MUI components to render the form fields and sections.
 * The component is memoized to prevent unnecessary re-renders.
 */
function LinaSettings() {
	const dispatch = useAppDispatch();
	const user = useAppSelector(selectUser);
	const settings = useAppSelector(selectLinaCurrentSettings);
	const { reset, watch, control } = useForm({
		mode: 'onChange',
		defaultValues: settings
	});
	const form = watch();
	const formConfigs = themeLayoutConfigs[form.layout.style].form;
	const prevForm = usePrevious(form ? _.merge({}, form) : null);
	const prevSettings = usePrevious(settings ? _.merge({}, settings) : null);
	const formChanged = !_.isEqual(form, prevForm);
	const settingsChanged = !_.isEqual(settings, prevSettings);
	const handleUpdate = useDebounce((newSettings) => {
		dispatch(setDefaultSettings(newSettings)).then(() => {
			dispatch(showMessage({ message: 'User settings saved with the api' }));
		});
	}, 300);
	useEffect(() => {
		// Skip initial changes
		if (!prevForm && !prevSettings) {
			return;
		}

		// If theme settings changed update form data
		if (settingsChanged) {
			reset(settings);
			return;
		}

		const newSettings = _.merge({}, settings, form);

		// No need to change
		if (_.isEqual(newSettings, settings)) {
			return;
		}

		// If form changed update theme settings
		if (formChanged) {
			if (settings.layout.style !== newSettings.layout.style) {
				_.set(newSettings, 'layout.config', themeLayoutConfigs[newSettings?.layout?.style]?.defaults);
			}

			handleUpdate(newSettings);
		}
	}, [dispatch, form, formChanged, handleUpdate, prevForm, prevSettings, reset, settings, settingsChanged, user]);
	const getForm = useCallback(
		(_formConfigs, prefix) =>
			Object.entries(_formConfigs).map(([key, formControl]) => {
				const target = prefix ? `${prefix}.${key}` : key;
				switch (formControl.type) {
					case 'radio': {
						return (
							<Controller
								key={target}
								// eslint-disable-next-line @typescript-eslint/ban-ts-comment
								// @ts-ignore
								name={target}
								control={control}
								render={({ field }) => (
									<FormControl
										component="fieldset"
										className="LinaSettings-formControl"
									>
										<FormLabel
											component="legend"
											className="text-14"
										>
											{formControl.title}
										</FormLabel>
										<RadioGroup
											{...field}
											aria-label={formControl.title}
											className="LinaSettings-group"
											row={formControl.options.length < 4}
										>
											{formControl.options.map((opt) => (
												<FormControlLabel
													key={opt.value}
													value={opt.value}
													control={<Radio />}
													label={opt.name}
												/>
											))}
										</RadioGroup>
									</FormControl>
								)}
							/>
						);
					}
					case 'switch': {
						return (
							<Controller
								key={target}
								// eslint-disable-next-line @typescript-eslint/ban-ts-comment
								// @ts-ignore
								name={target}
								control={control}
								render={({ field: { onChange, value } }) => (
									<FormControl
										component="fieldset"
										className="LinaSettings-formControl"
									>
										<FormLabel
											component="legend"
											className="text-14"
										>
											{formControl.title}
										</FormLabel>
										<Switch
											checked={value}
											onChange={(ev) => onChange(ev.target.checked)}
											aria-label={formControl.title}
										/>
									</FormControl>
								)}
							/>
						);
					}
					case 'number': {
						return (
							<div
								key={target}
								className="LinaSettings-formControl"
							>
								<Controller
									// eslint-disable-next-line @typescript-eslint/ban-ts-comment
									// @ts-ignore
									name={target}
									control={control}
									render={({ field }) => (
										<TextField
											{...field}
											label={formControl.title}
											type="number"
											InputLabelProps={{
												shrink: true
											}}
											variant="outlined"
										/>
									)}
								/>
							</div>
						);
					}
					case 'group': {
						return (
							<div
								key={target}
								className="LinaSettings-formGroup"
							>
								<Typography
									className="LinaSettings-formGroupTitle"
									color="text.secondary"
								>
									{formControl.title}
								</Typography>
								{getForm(formControl.children, target)}
							</div>
						);
					}
					default: {
						return '';
					}
				}
			}),
		[control]
	);
	return (
		<Root>
			<div className="LinaSettings-formGroup">
				<Typography
					className="LinaSettings-formGroupTitle"
					color="text.secondary"
				>
					Layout
				</Typography>

				<Controller
					name="layout.style"
					control={control}
					render={({ field }) => (
						<FormControl
							component="fieldset"
							className="LinaSettings-formControl"
						>
							<FormLabel
								component="legend"
								className="text-14"
							>
								Style
							</FormLabel>
							<RadioGroup
								{...field}
								aria-label="Layout Style"
								className="LinaSettings-group"
							>
								{Object.entries(themeLayoutConfigs).map(([key, layout]) => (
									<FormControlLabel
										key={key}
										value={key}
										control={<Radio />}
										label={layout.title}
									/>
								))}
							</RadioGroup>
						</FormControl>
					)}
				/>

				{useMemo(() => getForm(formConfigs, 'layout.config'), [formConfigs, getForm])}

				<Typography
					className="my-16 text-12 italic"
					color="text.secondary"
				>
					*Not all option combinations are available
				</Typography>
			</div>

			<div className="LinaSettings-formGroup pb-16">
				<Typography
					className="LinaSettings-formGroupTitle"
					color="text.secondary"
				>
					Theme
				</Typography>

				<div className="-mx-8 flex flex-wrap">
					<Controller
						name="theme.main"
						control={control}
						render={({ field: { value, onChange } }) => (
							<PaletteSelector
								value={value}
								onChange={onChange}
								triggerElement={
									<div className="group m-8 flex w-128 cursor-pointer flex-col items-center space-y-8">
										<SectionPreview
											className="transition-shadow group-hover:shadow-lg"
											section="main"
										/>
										<Typography className="mb-24 flex-1 text-14 font-semibold opacity-80 group-hover:opacity-100">
											Main Palette
										</Typography>
									</div>
								}
							/>
						)}
					/>

					<Controller
						name="theme.navbar"
						control={control}
						render={({ field: { value, onChange } }) => (
							<PaletteSelector
								value={value}
								onChange={onChange}
								triggerElement={
									<div className="group m-8 flex w-128 cursor-pointer flex-col items-center space-y-8">
										<SectionPreview
											className="transition-shadow group-hover:shadow-lg"
											section="navbar"
										/>
										<Typography className="mb-24 flex-1 text-14 font-semibold opacity-80 group-hover:opacity-100">
											Navbar Palette
										</Typography>
									</div>
								}
							/>
						)}
					/>

					<Controller
						name="theme.toolbar"
						control={control}
						render={({ field: { value, onChange } }) => (
							<PaletteSelector
								value={value}
								onChange={onChange}
								triggerElement={
									<div className="group m-8 flex w-128 cursor-pointer flex-col items-center space-y-8">
										<SectionPreview
											className="transition-shadow group-hover:shadow-lg"
											section="toolbar"
										/>
										<Typography className="mb-24 flex-1 text-14 font-semibold opacity-80 group-hover:opacity-100">
											Toolbar Palette
										</Typography>
									</div>
								}
							/>
						)}
					/>

					<Controller
						name="theme.footer"
						control={control}
						render={({ field: { value, onChange } }) => (
							<PaletteSelector
								value={value}
								onChange={onChange}
								triggerElement={
									<div className="group m-8 flex w-128 cursor-pointer flex-col items-center space-y-8">
										<SectionPreview
											className="transition-shadow group-hover:shadow-lg"
											section="footer"
										/>
										<Typography className="mb-24 flex-1 text-14 font-semibold opacity-80 group-hover:opacity-100">
											Footer Palette
										</Typography>
									</div>
								}
							/>
						)}
					/>
				</div>
			</div>

			<Controller
				name="customScrollbars"
				control={control}
				render={({ field: { onChange, value } }) => (
					<FormControl
						component="fieldset"
						className="LinaSettings-formControl"
					>
						<FormLabel
							component="legend"
							className="text-14"
						>
							Custom Scrollbars
						</FormLabel>
						<Switch
							checked={value}
							onChange={(ev) => onChange(ev.target.checked)}
							aria-label="Custom Scrollbars"
						/>
					</FormControl>
				)}
			/>

			<Controller
				name="direction"
				control={control}
				render={({ field }) => (
					<FormControl
						component="fieldset"
						className="LinaSettings-formControl"
					>
						<FormLabel
							component="legend"
							className="text-14"
						>
							Direction
						</FormLabel>
						<RadioGroup
							{...field}
							aria-label="Layout Direction"
							className="LinaSettings-group"
							row
						>
							<FormControlLabel
								key="rtl"
								value="rtl"
								control={<Radio />}
								label="RTL"
							/>
							<FormControlLabel
								key="ltr"
								value="ltr"
								control={<Radio />}
								label="LTR"
							/>
						</RadioGroup>
					</FormControl>
				)}
			/>
		</Root>
	);
}

export default memo(LinaSettings);
