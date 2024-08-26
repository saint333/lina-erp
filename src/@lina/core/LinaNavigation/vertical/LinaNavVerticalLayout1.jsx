import List from '@mui/material/List';
import { styled } from '@mui/material/styles';
import clsx from 'clsx';
import LinaNavItem from '../LinaNavItem';

const StyledList = styled(List)(({ theme }) => ({
	'& .lina-list-item': {
		'&:hover': {
			backgroundColor: theme.palette.mode === 'dark' ? 'rgba(255, 255, 255, 0.05)' : 'rgba(0,0,0,.04)'
		},
		'&:focus:not(.active)': {
			backgroundColor: theme.palette.mode === 'dark' ? 'rgba(255, 255, 255, 0.06)' : 'rgba(0,0,0,.05)'
		}
	},
	'& .lina-list-item-text': {
		margin: 0
	},
	'& .lina-list-item-text-primary': {
		lineHeight: '20px'
	},
	'&.active-square-list': {
		'& .lina-list-item, & .active.lina-list-item': {
			width: '100%',
			borderRadius: '0'
		}
	},
	'&.dense': {
		'& .lina-list-item': {
			paddingTop: 0,
			paddingBottom: 0,
			height: 32
		}
	}
}));

/**
 * LinaNavVerticalLayout1
 * This component is used to render vertical navigations using
 * the Material-UI List component. It accepts the LinaNavigationProps props
 * and renders the LinaNavItem components accordingly
 */
function LinaNavVerticalLayout1(props) {
	const { navigation, active, dense, className, onItemClick, checkPermission } = props;

	function handleItemClick(item) {
		onItemClick?.(item);
	}

	return (
		<StyledList
			className={clsx(
				'navigation whitespace-nowrap px-12 py-0',
				`active-${active}-list`,
				dense && 'dense',
				className
			)}
		>
			{navigation.map((_item) => (
				<LinaNavItem
					key={_item.id}
					type={`vertical-${_item.type}`}
					item={_item}
					nestedLevel={0}
					onItemClick={handleItemClick}
					checkPermission={checkPermission}
				/>
			))}
		</StyledList>
	);
}

export default LinaNavVerticalLayout1;
