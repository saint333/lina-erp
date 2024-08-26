import Drawer from '@mui/material/Drawer';
import Hidden from '@mui/material/Hidden';
import SwipeableDrawer from '@mui/material/SwipeableDrawer';
import clsx from 'clsx';
import { forwardRef, useCallback, useEffect, useImperativeHandle, useState } from 'react';
import LinaPageCardedSidebarContent from './LinaPageCardedSidebarContent';
/**
 * The LinaPageCardedSidebar component is a sidebar for the LinaPageCarded component.
 */
const LinaPageCardedSidebar = forwardRef((props, ref) => {
	const { open = true, position, variant, onClose = () => {} } = props;
	const [isOpen, setIsOpen] = useState(open);
	const handleToggleDrawer = useCallback((val) => {
		setIsOpen(val);
	}, []);
	useImperativeHandle(ref, () => ({
		toggleSidebar: handleToggleDrawer
	}));
	useEffect(() => {
		handleToggleDrawer(open);
	}, [handleToggleDrawer, open]);
	return (
		<>
			<Hidden lgUp={variant === 'permanent'}>
				<SwipeableDrawer
					variant="temporary"
					anchor={position}
					open={isOpen}
					onOpen={() => {}}
					onClose={() => onClose()}
					disableSwipeToOpen
					classes={{
						root: clsx('LinaPageCarded-sidebarWrapper', variant),
						paper: clsx(
							'LinaPageCarded-sidebar',
							variant,
							position === 'left' ? 'LinaPageCarded-leftSidebar' : 'LinaPageCarded-rightSidebar'
						)
					}}
					ModalProps={{
						keepMounted: true // Better open performance on mobile.
					}}
					BackdropProps={{
						classes: {
							root: 'LinaPageCarded-backdrop'
						}
					}}
					style={{ position: 'absolute' }}
				>
					<LinaPageCardedSidebarContent {...props} />
				</SwipeableDrawer>
			</Hidden>
			{variant === 'permanent' && (
				<Hidden lgDown>
					<Drawer
						variant="permanent"
						anchor={position}
						className={clsx(
							'LinaPageCarded-sidebarWrapper',
							variant,
							isOpen ? 'opened' : 'closed',
							position === 'left' ? 'LinaPageCarded-leftSidebar' : 'LinaPageCarded-rightSidebar'
						)}
						open={isOpen}
						onClose={onClose}
						classes={{
							paper: clsx('LinaPageCarded-sidebar', variant)
						}}
					>
						<LinaPageCardedSidebarContent {...props} />
					</Drawer>
				</Hidden>
			)}
		</>
	);
});
export default LinaPageCardedSidebar;
