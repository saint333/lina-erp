import { memo } from 'react';
import ThemePreview from '@lina/core/LinaThemeSelector/ThemePreview';
import { useTheme } from '@emotion/react';

/**
 * The LinaThemeSchemes component is responsible for rendering a list of theme schemes with preview images.
 * It uses the SchemePreview component to render each scheme preview.
 * The component is memoized to prevent unnecessary re-renders.
 */
function LinaThemeSelector(props) {
	const { onSelect, options } = props;
	const {palette: {mode}} = useTheme();
	return (
		<div>
			<div className="flex flex-col w-full">
				{
					mode === 'dark' ? (
						<ThemePreview
							className="mx-2"
							theme={options[0]}
							onSelect={onSelect}
						/>
					) : (
						<ThemePreview
							className="mx-2"
							theme={options[1]}
							onSelect={onSelect}
						/>
					)
				}
			</div>
		</div>
	);
}

export default memo(LinaThemeSelector);
