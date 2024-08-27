import LinaScrollbars from '@lina/core/LinaScrollbars';
import { styled } from '@mui/material/styles';
import clsx from 'clsx';
import { forwardRef, memo, useImperativeHandle, useRef } from 'react';
import GlobalStyles from '@mui/material/GlobalStyles';
import LinaPageCardedSidebar from './LinaPageCardedSidebar';
import LinaPageCardedHeader from './LinaPageCardedHeader';

const headerHeight = 120;
const toolbarHeight = 64;
const Root = styled('div')(({ theme, ...props }) => ({
	display: 'flex',
	flexDirection: 'column',
	minWidth: 0,
	minHeight: '100%',
	position: 'relative',
	flex: '1 1 auto',
	width: '100%',
	height: 'auto',
	backgroundColor: theme.palette.background.default,
	'& .LinaPageCarded-scroll-content': {
		height: '100%'
	},
	'& .LinaPageCarded-wrapper': {
		display: 'flex',
		flexDirection: 'row',
		flex: '1 1 auto',
		zIndex: 2,
		maxWidth: '100%',
		minWidth: 0,
		height: '100%',
		backgroundColor: theme.palette.background.paper,
		...(props.scroll === 'content' && {
			position: 'absolute',
			top: 0,
			bottom: 0,
			right: 0,
			left: 0,
			overflow: 'hidden'
		})
	},
	'& .LinaPageCarded-header': {
		display: 'flex',
		flex: '0 0 auto'
	},
	'& .LinaPageCarded-contentWrapper': {
		display: 'flex',
		flexDirection: 'column',
		flex: '1 1 auto',
		overflow: 'auto',
		WebkitOverflowScrolling: 'touch',
		zIndex: 9999
	},
	'& .LinaPageCarded-toolbar': {
		height: toolbarHeight,
		minHeight: toolbarHeight,
		display: 'flex',
		alignItems: 'center'
	},
	'& .LinaPageCarded-content': {
		flex: '1 0 auto'
	},
	'& .LinaPageCarded-sidebarWrapper': {
		overflow: 'hidden',
		backgroundColor: 'transparent',
		position: 'absolute',
		'&.permanent': {
			[theme.breakpoints.up('lg')]: {
				position: 'relative',
				marginLeft: 0,
				marginRight: 0,
				transition: theme.transitions.create('margin', {
					easing: theme.transitions.easing.sharp,
					duration: theme.transitions.duration.leavingScreen
				}),
				'&.closed': {
					transition: theme.transitions.create('margin', {
						easing: theme.transitions.easing.easeOut,
						duration: theme.transitions.duration.enteringScreen
					}),
					'&.LinaPageCarded-leftSidebar': {
						marginLeft: -props.leftSidebarWidth
					},
					'&.LinaPageCarded-rightSidebar': {
						marginRight: -props.rightSidebarWidth
					}
				}
			}
		}
	},
	'& .LinaPageCarded-sidebar': {
		position: 'absolute',
		backgroundColor: theme.palette.background.paper,
		color: theme.palette.text.primary,
		'&.permanent': {
			[theme.breakpoints.up('lg')]: {
				position: 'relative'
			}
		},
		maxWidth: '100%',
		height: '100%'
	},
	'& .LinaPageCarded-leftSidebar': {
		width: props.leftSidebarWidth,
		[theme.breakpoints.up('lg')]: {
			// borderRight: `1px solid ${theme.palette.divider}`,
			// borderLeft: 0,
		}
	},
	'& .LinaPageCarded-rightSidebar': {
		width: props.rightSidebarWidth,
		[theme.breakpoints.up('lg')]: {
			// borderLeft: `1px solid ${theme.palette.divider}`,
			// borderRight: 0,
		}
	},
	'& .LinaPageCarded-sidebarHeader': {
		height: headerHeight,
		minHeight: headerHeight,
		backgroundColor: theme.palette.primary.dark,
		color: theme.palette.primary.contrastText
	},
	'& .LinaPageCarded-sidebarHeaderInnerSidebar': {
		backgroundColor: 'transparent',
		color: 'inherit',
		height: 'auto',
		minHeight: 'auto'
	},
	'& .LinaPageCarded-sidebarContent': {
		display: 'flex',
		flexDirection: 'column',
		minHeight: '100%'
	},
	'& .LinaPageCarded-backdrop': {
		position: 'absolute'
	}
}));
/**
 * The LinaPageCarded component is a carded page layout with left and right sidebars.
 */
const LinaPageCarded = forwardRef((props, ref) => {
	const {
		scroll = 'page',
		className,
		header,
		content,
		leftSidebarContent,
		rightSidebarContent,
		leftSidebarOpen = false,
		rightSidebarOpen = false,
		rightSidebarWidth = 240,
		leftSidebarWidth = 240,
		leftSidebarVariant = 'permanent',
		rightSidebarVariant = 'permanent',
		rightSidebarOnClose,
		leftSidebarOnClose
	} = props;
	const leftSidebarRef = useRef(null);
	const rightSidebarRef = useRef(null);
	const rootRef = useRef(null);
	useImperativeHandle(ref, () => ({
		rootRef,
		toggleLeftSidebar: (val) => {
			leftSidebarRef.current.toggleSidebar(val);
		},
		toggleRightSidebar: (val) => {
			rightSidebarRef.current.toggleSidebar(val);
		}
	}));
	return (
		<>
			<GlobalStyles
				styles={() => ({
					...(scroll !== 'page' && {
						'#lina-toolbar': {
							position: 'static'
						},
						'#lina-footer': {
							position: 'static'
						}
					}),
					...(scroll === 'page' && {
						'#lina-toolbar': {
							position: 'sticky',
							top: 0
						},
						'#lina-footer': {
							position: 'sticky',
							bottom: 0
						}
					})
				})}
			/>
			<Root
				className={clsx('LinaPageCarded-root', `LinaPageCarded-scroll-${props.scroll}`, className)}
				ref={rootRef}
				scroll={scroll}
				leftSidebarWidth={leftSidebarWidth}
				rightSidebarWidth={rightSidebarWidth}
			>
				{header && <LinaPageCardedHeader header={header} />}

				<div className="container relative z-10 flex h-full flex-auto flex-col overflow-hidden rounded-t-16 shadow-1">
					<div className="LinaPageCarded-wrapper">
						{leftSidebarContent && (
							<LinaPageCardedSidebar
								position="left"
								variant={leftSidebarVariant}
								ref={leftSidebarRef}
								open={leftSidebarOpen}
								onClose={leftSidebarOnClose}
							>
								{leftSidebarContent}
							</LinaPageCardedSidebar>
						)}
						<LinaScrollbars
							className="LinaPageCarded-contentWrapper"
							enable={scroll === 'content'}
						>
							{content && <div className={clsx('LinaPageCarded-content')}>{content}</div>}
						</LinaScrollbars>
						{rightSidebarContent && (
							<LinaPageCardedSidebar
								position="right"
								variant={rightSidebarVariant || 'permanent'}
								ref={rightSidebarRef}
								open={rightSidebarOpen}
								onClose={rightSidebarOnClose}
							>
								{rightSidebarContent}
							</LinaPageCardedSidebar>
						)}
					</div>
				</div>
			</Root>
		</>
	);
});
export default memo(styled(LinaPageCarded)``);
