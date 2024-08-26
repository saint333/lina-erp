import Drawer from '@mui/material/Drawer';
import Hidden from '@mui/material/Hidden';
import SwipeableDrawer from '@mui/material/SwipeableDrawer';
import clsx from 'clsx';
import { forwardRef, useCallback, useEffect, useImperativeHandle, useState } from 'react';
import LinaPageSimpleSidebarContent from './LinaPageSimpleSidebarContent';
/**
 * The LinaPageSimpleSidebar component.
 */
const LinaPageSimpleSidebar = forwardRef((props, ref) => {
	const { open = true, position, variant, onClose = () => {} } = props;
	const [isOpen, setIsOpen] = useState(open);
	useImperativeHandle(ref, () => ({
		toggleSidebar: handleToggleDrawer
	}));
	const handleToggleDrawer = useCallback((val) => {
		setIsOpen(val);
	}, []);
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
						root: clsx('LinaPageSimple-sidebarWrapper', variant),
						paper: clsx(
							'LinaPageSimple-sidebar',
							variant,
							position === 'left' ? 'LinaPageSimple-leftSidebar' : 'LinaPageSimple-rightSidebar',
							'max-w-full'
						)
					}}
					ModalProps={{
						keepMounted: true // Better open performance on mobile.
					}}
					// container={rootRef.current}
					BackdropProps={{
						classes: {
							root: 'LinaPageSimple-backdrop'
						}
					}}
					style={{ position: 'absolute' }}
				>
					<LinaPageSimpleSidebarContent {...props} />
				</SwipeableDrawer>
			</Hidden>

			{variant === 'permanent' && (
				<Hidden lgDown>
					<Drawer
						variant="permanent"
						anchor={position}
						className={clsx(
							'LinaPageSimple-sidebarWrapper',
							variant,
							isOpen ? 'opened' : 'closed',
							position === 'left' ? 'LinaPageSimple-leftSidebar' : 'LinaPageSimple-rightSidebar'
						)}
						open={isOpen}
						onClose={onClose}
						classes={{
							paper: clsx('LinaPageSimple-sidebar border-0', variant)
						}}
					>
						<LinaPageSimpleSidebarContent {...props} />
					</Drawer>
				</Hidden>
			)}
		</>
	);
});
export default LinaPageSimpleSidebar;
