import { linaDark, skyBlue } from '@lina/colors';
import { blueGrey } from '@mui/material/colors';
/**
 * The lightPaletteText object defines the text color palette for the light theme.
 */
export const lightPaletteText = {
	primary: 'rgb(17, 24, 39)',
	secondary: 'rgb(107, 114, 128)',
	disabled: 'rgb(149, 156, 169)'
};
/**
 * The darkPaletteText object defines the text color palette for the dark theme.
 */
export const darkPaletteText = {
	primary: 'rgb(255,255,255)',
	secondary: 'rgb(148, 163, 184)',
	disabled: 'rgb(156, 163, 175)'
};
/**
 * The themesConfig object is a configuration object for the color themes of the Lina application.
 */
export const themesConfig = {
	default: {
		palette: {
			mode: 'light',
			divider: '#e2e8f0',
			text: lightPaletteText,
			common: {
				black: 'rgb(17, 24, 39)',
				white: 'rgb(255, 255, 255)'
			},
			primary: {
				light: '#64748b',
				main: '#1e293b',
				dark: '#0f172a',
				contrastText: darkPaletteText.primary
			},
			secondary: {
				light: '#818cf8',
				main: '#FF66C4',
				dark: '#FF66C4',
				contrastText: darkPaletteText.primary
			},
			background: {
				paper: '#FFFFFF',
				default: '#f1f5f9'
			},
			error: {
				light: '#ffcdd2',
				main: '#f44336',
				dark: '#b71c1c',
				contrastText: darkPaletteText.primary
			}
		}
	},
	defaultDark: {
		palette: {
			mode: 'dark',
			divider: 'rgba(241,245,249,.12)',
			text: darkPaletteText,
			common: {
				black: 'rgb(17, 24, 39)',
				white: 'rgb(255, 255, 255)'
			},
			primary: {
				light: '#64748b',
				main: '#334155',
				dark: '#0f172a',
				contrastText: darkPaletteText.primary
			},
			secondary: {
				light: '#818cf8',
				main: '#FF66C4',
				dark: '#3730a3',
				contrastText: darkPaletteText.primary
			},
			background: {
				paper: '#1e293b',
				default: '#111827'
			},
			error: {
				light: '#ffcdd2',
				main: '#f44336',
				dark: '#b71c1c'
			}
		}
	}
};
export default themesConfig;
