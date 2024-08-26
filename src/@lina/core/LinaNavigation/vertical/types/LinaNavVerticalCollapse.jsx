import NavLinkAdapter from '@lina/core/NavLinkAdapter';
import { alpha, styled } from '@mui/material/styles';
import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';
import ListItemText from '@mui/material/ListItemText';
import clsx from 'clsx';
import { useEffect, useMemo, useState } from 'react';
import { useLocation } from 'react-router-dom';
import List from '@mui/material/List';
import isUrlInChildren from '@lina/core/LinaNavigation/isUrlInChildren';
import { ListItemButton } from '@mui/material';
import LinaNavBadge from '../../LinaNavBadge';
import LinaNavItem from '../../LinaNavItem';
import LinaSvgIcon from '../../../LinaSvgIcon';

const Root = styled(List)(({ theme, ...props }) => ({
	padding: 0,
	'&.open': {},
	'& > .lina-list-item': {
		minHeight: 44,
		width: '100%',
		borderRadius: '6px',
		margin: '0 0 4px 0',
		paddingRight: 16,
		paddingLeft: props.itempadding > 80 ? 80 : props.itempadding,
		paddingTop: 10,
		paddingBottom: 10,
		color: alpha(theme.palette.text.primary, 0.7),
		'&:hover': {
			color: theme.palette.text.primary
		},
		'& > .lina-list-item-icon': {
			marginRight: 16,
			color: 'inherit'
		}
	}
}));

function needsToBeOpened(location, item) {
	return location && isUrlInChildren(item, location.pathname);
}

/**
 * LinaNavVerticalCollapse component used for vertical navigation items with collapsible children.
 */
function LinaNavVerticalCollapse(props) {
	const location = useLocation();
	const { item, nestedLevel = 0, onItemClick, checkPermission } = props;
	const [open, setOpen] = useState(() => needsToBeOpened(location, item));
	const itempadding = nestedLevel > 0 ? 38 + nestedLevel * 16 : 16;
	useEffect(() => {
		if (needsToBeOpened(location, item)) {
			if (!open) {
				setOpen(true);
			}
		}
	}, [location, item]);
	const component = item.url ? NavLinkAdapter : 'li';
	let itemProps = {};

	if (typeof component !== 'string') {
		itemProps = {
			disabled: item.disabled,
			to: item.url,
			end: item.end,
			role: 'button'
		};
	}

	if (checkPermission && !item?.hasPermission) {
		return null;
	}

	return useMemo(
		() => (
			<Root
				className={clsx(open && 'open')}
				itempadding={itempadding}
				sx={item.sx}
			>
				<ListItemButton
					component={component}
					className="lina-list-item"
					onClick={() => {
						setOpen(!open);
					}}
					{...itemProps}
				>
					{item.icon && (
						<LinaSvgIcon
							className={clsx('lina-list-item-icon shrink-0', item.iconClass)}
							color="action"
						>
							{item.icon}
						</LinaSvgIcon>
					)}

					<ListItemText
						className="lina-list-item-text"
						primary={item.title}
						secondary={item.subtitle}
						classes={{
							primary: 'text-13 font-medium lina-list-item-text-primary truncate',
							secondary: 'text-11 font-medium lina-list-item-text-secondary leading-normal truncate'
						}}
					/>

					{item.badge && (
						<LinaNavBadge
							className="mx-4"
							badge={item.badge}
						/>
					)}

					<IconButton
						disableRipple
						className="-mx-12 h-20 w-20 p-0 hover:bg-transparent focus:bg-transparent"
						onClick={(ev) => {
							ev.preventDefault();
							ev.stopPropagation();
							setOpen(!open);
						}}
						size="large"
					>
						<LinaSvgIcon
							size={16}
							className="arrow-icon"
							color="inherit"
						>
							{open ? 'heroicons-solid:chevron-down' : 'heroicons-solid:chevron-right'}
						</LinaSvgIcon>
					</IconButton>
				</ListItemButton>

				{item.children && (
					<Collapse
						in={open}
						className="collapse-children"
					>
						{item.children.map((_item) => (
							<LinaNavItem
								key={_item.id}
								type={`vertical-${_item.type}`}
								item={_item}
								nestedLevel={nestedLevel + 1}
								onItemClick={onItemClick}
								checkPermission={checkPermission}
							/>
						))}
					</Collapse>
				)}
			</Root>
		),
		[
			item.badge,
			item.children,
			item.icon,
			item.iconClass,
			item.title,
			item.url,
			itempadding,
			nestedLevel,
			onItemClick,
			open
		]
	);
}

const NavVerticalCollapse = LinaNavVerticalCollapse;
export default NavVerticalCollapse;
