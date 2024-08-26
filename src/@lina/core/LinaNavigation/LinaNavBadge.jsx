import { styled } from '@mui/material/styles';
import clsx from 'clsx';
import { memo } from 'react';

const Root = styled('div')(({ theme }) => ({
	padding: '0 7px',
	fontSize: 11,
	fontWeight: 600,
	height: 20,
	minWidth: 20,
	borderRadius: 20,
	display: 'flex',
	alignItems: 'center',
	backgroundColor: theme.palette.secondary.main,
	color: theme.palette.secondary.contrastText
}));

/**
 * LinaNavBadge component.
 * This component will render a badge on a LinaNav element. It accepts a `LinaNavBadgeType` as a prop,
 * which is an object containing a title and background and foreground colour.
 */
function LinaNavBadge(props) {
	const { className = '', classes = '', badge } = props;
	return (
		<Root
			className={clsx('item-badge', className, classes)}
			style={{
				backgroundColor: badge.bg,
				color: badge.fg
			}}
		>
			{badge.title}
		</Root>
	);
}

export default memo(LinaNavBadge);
