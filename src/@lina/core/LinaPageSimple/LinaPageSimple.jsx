import LinaScrollbars from '@lina/core/LinaScrollbars';
import { styled } from '@mui/material/styles';
import clsx from 'clsx';
import { forwardRef, memo, useImperativeHandle, useRef } from 'react';
import GlobalStyles from '@mui/material/GlobalStyles';
import LinaPageSimpleHeader from './LinaPageSimpleHeader';
import LinaPageSimpleSidebar from './LinaPageSimpleSidebar';

const headerHeight = 120;
const toolbarHeight = 64;
/**
 * The Root styled component is the top-level container for the LinaPageSimple component.
 */
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
	'&.LinaPageSimple-scroll-content': {
		height: '100%'
	},
	'& .LinaPageSimple-wrapper': {
		display: 'flex',
		flexDirection: 'row',
		flex: '1 1 auto',
		zIndex: 2,
		minWidth: 0,
		height: '100%',
		backgroundColor: theme.palette.background.default,
		...(props.scroll === 'content' && {
			position: 'absolute',
			top: 0,
			bottom: 0,
			right: 0,
			left: 0,
			overflow: 'hidden'
		})
	},
	'& .LinaPageSimple-header': {
		display: 'flex',
		flex: '0 0 auto',
		backgroundSize: 'cover'
	},
	'& .LinaPageSimple-topBg': {
		position: 'absolute',
		left: 0,
		right: 0,
		top: 0,
		height: headerHeight,
		pointerEvents: 'none'
	},
	'& .LinaPageSimple-contentWrapper': {
		display: 'flex',
		flexDirection: 'column',
		width: '100%',
		flex: '1 1 auto',
		overflow: 'hidden',
		//    WebkitOverflowScrolling: 'touch',
		zIndex: 9999
	},
	'& .LinaPageSimple-toolbar': {
		height: toolbarHeight,
		minHeight: toolbarHeight,
		display: 'flex',
		alignItems: 'center'
	},
	'& .LinaPageSimple-content': {
		display: 'flex',
		flex: '1 1 auto',
		alignItems: 'start',
		minHeight: 0,
		overflowY: 'auto'
	},
	'& .LinaPageSimple-sidebarWrapper': {
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
					'&.LinaPageSimple-leftSidebar': {
						marginLeft: -props.leftSidebarWidth
					},
					'&.LinaPageSimple-rightSidebar': {
						marginRight: -props.rightSidebarWidth
					}
				}
			}
		}
	},
	'& .LinaPageSimple-sidebar': {
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
	'& .LinaPageSimple-leftSidebar': {
		width: props.leftSidebarWidth,
		[theme.breakpoints.up('lg')]: {
			borderRight: `1px solid ${theme.palette.divider}`,
			borderLeft: 0
		}
	},
	'& .LinaPageSimple-rightSidebar': {
		width: props.rightSidebarWidth,
		[theme.breakpoints.up('lg')]: {
			borderLeft: `1px solid ${theme.palette.divider}`,
			borderRight: 0
		}
	},
	'& .LinaPageSimple-sidebarHeader': {
		height: headerHeight,
		minHeight: headerHeight,
		backgroundColor: theme.palette.primary.dark,
		color: theme.palette.primary.contrastText
	},
	'& .LinaPageSimple-sidebarHeaderInnerSidebar': {
		backgroundColor: 'transparent',
		color: 'inherit',
		height: 'auto',
		minHeight: 'auto'
	},
	'& .LinaPageSimple-sidebarContent': {
		display: 'flex',
		flexDirection: 'column',
		minHeight: '100%'
	},
	'& .LinaPageSimple-backdrop': {
		position: 'absolute'
	}
}));
/**
 * The LinaPageSimple component is a layout component that provides a simple page layout with a header, left sidebar, right sidebar, and content area.
 * It is designed to be used as a top-level component for an application or as a sub-component within a larger layout.
 */
const LinaPageSimple = forwardRef((props, ref) => {
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
			leftSidebarRef?.current?.toggleSidebar(val);
		},
		toggleRightSidebar: (val) => {
			rightSidebarRef?.current?.toggleSidebar(val);
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
				className={clsx('LinaPageSimple-root', `LinaPageSimple-scroll-${scroll}`, className)}
				ref={rootRef}
				scroll={scroll}
				leftSidebarWidth={leftSidebarWidth}
				rightSidebarWidth={rightSidebarWidth}
			>
				<div className="z-10 flex h-full flex-auto flex-col">
					<div className="LinaPageSimple-wrapper">
						{leftSidebarContent && (
							<LinaPageSimpleSidebar
								position="left"
								variant={leftSidebarVariant || 'permanent'}
								ref={leftSidebarRef}
								open={leftSidebarOpen}
								onClose={leftSidebarOnClose}
							>
								{leftSidebarContent}
							</LinaPageSimpleSidebar>
						)}
						<div className="LinaPageSimple-contentWrapper">
							{header && <LinaPageSimpleHeader header={header} />}

							{content && (
								<LinaScrollbars
									enable={scroll === 'content'}
									className={clsx('LinaPageSimple-content container')}
								>
									{content}
								</LinaScrollbars>
							)}
						</div>
						{rightSidebarContent && (
							<LinaPageSimpleSidebar
								position="right"
								variant={rightSidebarVariant || 'permanent'}
								ref={rightSidebarRef}
								open={rightSidebarOpen}
								onClose={rightSidebarOnClose}
							>
								{rightSidebarContent}
							</LinaPageSimpleSidebar>
						)}
					</div>
				</div>
			</Root>
		</>
	);
});
export default memo(styled(LinaPageSimple)``);
