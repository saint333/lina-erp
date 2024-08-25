import clsx from 'clsx';
import Typography from '@mui/material/Typography';
import { IconButton, useTheme } from '@mui/material';
import { DarkMode, LightMode } from '@mui/icons-material';

/**
 * The ThemePreview component is responsible for rendering a preview of a theme scheme.
 * It uses various MUI components to render the preview.
 * The component is memoized to prevent unnecessary re-renders.
 */
function ThemePreview(props) {
	const { theme, className, onSelect = () => {} } = props;
	const { section, id } = theme;
	const { navbar, toolbar, footer, main } = section;
	const {palette: {mode}} = useTheme();

	return (
		<div className={clsx(className, 'w-full ')}>
			<IconButton
				className={clsx(
					'flex min-h-full relative w-full cursor-pointer overflow-hidden text-left font-500 shadow transition-all hover:shadow-lg items-stretch hover:scale-105 duration-200 ease-in-out',
					// {
					// 	'bg-white': id === 'default',
					// 	'bg-gray-700': id !== 'default'
					// }
				)}
				// style={{
				// 	backgroundColor: main.palette.background.default,
				// 	color: main.palette.text.primary
				// }}
				onClick={() => {
					onSelect(theme);
				}}
				type="button"
			>
				{
					mode === 'dark' ? (
						<LightMode />
					) : (
						<DarkMode />
					)
				}
			</IconButton>
		</div>
	);
}

export default ThemePreview;
