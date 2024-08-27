import LinaScrollbars from '@lina/core/LinaScrollbars';
import { styled } from '@mui/material/styles';
import Fab from '@mui/material/Fab';
import Hidden from '@mui/material/Hidden';
import IconButton from '@mui/material/IconButton';
import Paper from '@mui/material/Paper';
import SwipeableDrawer from '@mui/material/SwipeableDrawer';
import Tooltip from '@mui/material/Tooltip';
import clsx from 'clsx';
import { memo, useState } from 'react';
import LinaSvgIcon from '../LinaSvgIcon';

const Root = styled('div')(({ theme }) => ({
	'& .LinaSidePanel-paper': {
		display: 'flex',
		width: 56,
		transition: theme.transitions.create(['transform', 'width', 'min-width'], {
			easing: theme.transitions.easing.sharp,
			duration: theme.transitions.duration.shorter
		}),
		paddingBottom: 64,
		height: '100%',
		maxHeight: '100vh',
		position: 'sticky',
		top: 0,
		zIndex: 999,
		'&.left': {
			'& .LinaSidePanel-buttonWrapper': {
				left: 0,
				right: 'auto'
			},
			'& .LinaSidePanel-buttonIcon': {
				transform: 'rotate(0deg)'
			}
		},
		'&.right': {
			'& .LinaSidePanel-buttonWrapper': {
				right: 0,
				left: 'auto'
			},
			'& .LinaSidePanel-buttonIcon': {
				transform: 'rotate(-180deg)'
			}
		},
		'&.closed': {
			[theme.breakpoints.up('lg')]: {
				width: 0
			},
			'&.left': {
				'& .LinaSidePanel-buttonWrapper': {
					justifyContent: 'start'
				},
				'& .LinaSidePanel-button': {
					borderBottomLeftRadius: 0,
					borderTopLeftRadius: 0,
					paddingLeft: 4
				},
				'& .LinaSidePanel-buttonIcon': {
					transform: 'rotate(-180deg)'
				}
			},
			'&.right': {
				'& .LinaSidePanel-buttonWrapper': {
					justifyContent: 'flex-end'
				},
				'& .LinaSidePanel-button': {
					borderBottomRightRadius: 0,
					borderTopRightRadius: 0,
					paddingRight: 4
				},
				'& .LinaSidePanel-buttonIcon': {
					transform: 'rotate(0deg)'
				}
			},
			'& .LinaSidePanel-buttonWrapper': {
				width: 'auto'
			},
			'& .LinaSidePanel-button': {
				backgroundColor: theme.palette.background.paper,
				borderRadius: 38,
				transition: theme.transitions.create(
					['background-color', 'border-radius', 'width', 'min-width', 'padding'],
					{
						easing: theme.transitions.easing.easeInOut,
						duration: theme.transitions.duration.shorter
					}
				),
				width: 24,
				'&:hover': {
					width: 52,
					paddingLeft: 8,
					paddingRight: 8
				}
			},
			'& .LinaSidePanel-content': {
				opacity: 0
			}
		}
	},
	'& .LinaSidePanel-content': {
		overflow: 'hidden',
		opacity: 1,
		transition: theme.transitions.create(['opacity'], {
			easing: theme.transitions.easing.easeInOut,
			duration: theme.transitions.duration.short
		})
	},
	'& .LinaSidePanel-buttonWrapper': {
		position: 'absolute',
		bottom: 0,
		left: 0,
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'center',
		padding: '12px 0',
		width: '100%',
		minWidth: 56
	},
	'& .LinaSidePanel-button': {
		padding: 8,
		width: 40,
		height: 40
	},
	'& .LinaSidePanel-buttonIcon': {
		transition: theme.transitions.create(['transform'], {
			easing: theme.transitions.easing.easeInOut,
			duration: theme.transitions.duration.short
		})
	},
	'& .LinaSidePanel-mobileButton': {
		height: 40,
		position: 'absolute',
		zIndex: 99,
		bottom: 12,
		width: 24,
		borderRadius: 38,
		padding: 8,
		backgroundColor: theme.palette.background.paper,
		transition: theme.transitions.create(['background-color', 'border-radius', 'width', 'min-width', 'padding'], {
			easing: theme.transitions.easing.easeInOut,
			duration: theme.transitions.duration.shorter
		}),
		'&:hover': {
			width: 52,
			paddingLeft: 8,
			paddingRight: 8
		},
		'&.left': {
			borderBottomLeftRadius: 0,
			borderTopLeftRadius: 0,
			paddingLeft: 4,
			left: 0
		},
		'&.right': {
			borderBottomRightRadius: 0,
			borderTopRightRadius: 0,
			paddingRight: 4,
			right: 0,
			'& .LinaSidePanel-buttonIcon': {
				transform: 'rotate(-180deg)'
			}
		}
	}
}));

/**
 * The LinaSidePanel component is responsible for rendering a side panel that can be opened and closed.
 * It uses various MUI components to render the panel and its contents.
 * The component is memoized to prevent unnecessary re-renders.
 */
function LinaSidePanel(props) {
	const { position = 'left', opened = true, className, children } = props;
	const [panelOpened, setPanelOpened] = useState(Boolean(opened));
	const [mobileOpen, setMobileOpen] = useState(false);

	function toggleOpened() {
		setPanelOpened(!panelOpened);
	}

	function toggleMobileDrawer() {
		setMobileOpen(!mobileOpen);
	}

	return (
		<Root>
			<Hidden lgDown>
				<Paper
					className={clsx(
						'LinaSidePanel-paper',
						className,
						panelOpened ? 'opened' : 'closed',
						position,
						'shadow-lg'
					)}
					square
				>
					<LinaScrollbars className={clsx('content', 'LinaSidePanel-content')}>{children}</LinaScrollbars>

					<div className="LinaSidePanel-buttonWrapper">
						<Tooltip
							title="Toggle side panel"
							placement={position === 'left' ? 'right' : 'right'}
						>
							<IconButton
								className="LinaSidePanel-button"
								onClick={toggleOpened}
								disableRipple
								size="large"
							>
								<LinaSvgIcon className="LinaSidePanel-buttonIcon">
									heroicons-outline:chevron-left
								</LinaSvgIcon>
							</IconButton>
						</Tooltip>
					</div>
				</Paper>
			</Hidden>
			<Hidden lgUp>
				<SwipeableDrawer
					classes={{
						paper: clsx('LinaSidePanel-paper', className)
					}}
					anchor={position}
					open={mobileOpen}
					onOpen={() => {}}
					onClose={toggleMobileDrawer}
					disableSwipeToOpen
				>
					<LinaScrollbars className={clsx('content', 'LinaSidePanel-content')}>{children}</LinaScrollbars>
				</SwipeableDrawer>

				<Tooltip
					title="Hide side panel"
					placement={position === 'left' ? 'right' : 'right'}
				>
					<Fab
						className={clsx('LinaSidePanel-mobileButton', position)}
						onClick={toggleMobileDrawer}
						disableRipple
					>
						<LinaSvgIcon className="LinaSidePanel-buttonIcon">heroicons-outline:chevron-right</LinaSvgIcon>
					</Fab>
				</Tooltip>
			</Hidden>
		</Root>
	);
}

export default memo(LinaSidePanel);
