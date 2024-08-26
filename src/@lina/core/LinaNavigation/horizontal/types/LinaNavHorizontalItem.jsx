import NavLinkAdapter from '@lina/core/NavLinkAdapter';
import { styled } from '@mui/material/styles';
import ListItemText from '@mui/material/ListItemText';
import clsx from 'clsx';
import { memo, useMemo } from 'react';
import withRouter from '@lina/core/withRouter';
import { ListItemButton } from '@mui/material';
import LinaNavBadge from '../../LinaNavBadge';
import LinaSvgIcon from '../../../LinaSvgIcon';

const Root = styled(ListItemButton)(({ theme }) => ({
	color: theme.palette.text.primary,
	textDecoration: 'none!important',
	minHeight: 48,
	'&.active': {
		backgroundColor: `${theme.palette.secondary.main}!important`,
		color: `${theme.palette.secondary.contrastText}!important`,
		pointerEvents: 'none',
		'& .lina-list-item-text-primary': {
			color: 'inherit'
		},
		'& .lina-list-item-icon': {
			color: 'inherit'
		}
	},
	'& .lina-list-item-icon': {},
	'& .lina-list-item-text': {
		padding: '0 0 0 16px'
	}
}));

/**
 * LinaNavHorizontalItem is a component responsible for rendering the navigation element in the horizontal menu in the Lina theme.
 */
function LinaNavHorizontalItem(props) {
	const { item, checkPermission } = props;
	const component = item.url ? NavLinkAdapter : 'li';
	let itemProps;

	if (typeof component !== 'string') {
		itemProps = {
			disabled: item.disabled,
			to: item.url || '',
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
				component={component}
				className={clsx('lina-list-item', item.active && 'active')}
				sx={item.sx}
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
					classes={{ primary: 'text-13 lina-list-item-text-primary truncate' }}
				/>

				{item.badge && (
					<LinaNavBadge
						className="ltr:ml-8 rtl:mr-8"
						badge={item.badge}
					/>
				)}
			</Root>
		),
		[item.badge, item.exact, item.icon, item.iconClass, item.title, item.url]
	);
}

const NavHorizontalItem = withRouter(memo(LinaNavHorizontalItem));
export default NavHorizontalItem;
