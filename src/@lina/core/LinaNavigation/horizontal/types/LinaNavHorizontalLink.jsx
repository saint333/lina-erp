import { styled } from '@mui/material/styles';
import ListItemText from '@mui/material/ListItemText';
import clsx from 'clsx';
import { memo, useMemo } from 'react';
import withRouter from '@lina/core/withRouter';
import { Link, ListItemButton } from '@mui/material';
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

/*
 * LinaNavHorizontalLink
 * This is a component to render horizontal navigation links in the Lina navigations.
 * It receieves `LinaNavItemComponentProps` and `WithRouterProps` as props.
 */
function LinaNavHorizontalLink(props) {
	const { item, checkPermission } = props;
	let itemProps;
	const component = item.url ? Link : 'li';

	if (typeof component !== 'string') {
		itemProps = {
			disabled: item.disabled,
			href: item.url,
			role: 'button',
			target: item.target ? item.target : '_blank'
		};
	}

	if (checkPermission && !item?.hasPermission) {
		return null;
	}

	return useMemo(
		() => (
			<Root
				component={component}
				className={clsx('lina-list-item')}
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
		[item.badge, item.icon, item.iconClass, item.target, item.title, item.url]
	);
}

const NavHorizontalLink = withRouter(memo(LinaNavHorizontalLink));
export default NavHorizontalLink;
