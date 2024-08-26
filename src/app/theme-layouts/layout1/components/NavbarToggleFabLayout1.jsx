import { useAppDispatch, useAppSelector } from 'app/store/hooks';
import useThemeMediaQuery from '@lina/hooks/useThemeMediaQuery';
import { selectLinaCurrentLayoutConfig } from '@lina/core/LinaSettings/linaSettingsSlice';
import { navbarToggle, navbarToggleMobile } from 'app/theme-layouts/shared-components/navbar/navbarSlice';
import NavbarToggleFab from 'app/theme-layouts/shared-components/navbar/NavbarToggleFab';

/**
 * The navbar toggle fab layout 1.
 */
function NavbarToggleFabLayout1(props) {
	const { className } = props;
	const isMobile = useThemeMediaQuery((theme) => theme.breakpoints.down('lg'));
	const config = useAppSelector(selectLinaCurrentLayoutConfig);
	const dispatch = useAppDispatch();
	return (
		<NavbarToggleFab
			className={className}
			onClick={() => {
				dispatch(isMobile ? navbarToggleMobile() : navbarToggle());
			}}
			position={config.navbar.position}
		/>
	);
}

export default NavbarToggleFabLayout1;
