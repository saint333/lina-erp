import Divider from '@mui/material/Divider';
import { memo } from 'react';
import GlobalStyles from '@mui/material/GlobalStyles';
import LinaNavHorizontalLayout1 from './horizontal/LinaNavHorizontalLayout1';
import LinaNavVerticalLayout1 from './vertical/LinaNavVerticalLayout1';
import LinaNavVerticalLayout2 from './vertical/LinaNavVerticalLayout2';
import LinaNavHorizontalCollapse from './horizontal/types/LinaNavHorizontalCollapse';
import LinaNavHorizontalGroup from './horizontal/types/LinaNavHorizontalGroup';
import LinaNavHorizontalItem from './horizontal/types/LinaNavHorizontalItem';
import LinaNavHorizontalLink from './horizontal/types/LinaNavHorizontalLink';
import LinaNavVerticalCollapse from './vertical/types/LinaNavVerticalCollapse';
import LinaNavVerticalGroup from './vertical/types/LinaNavVerticalGroup';
import LinaNavVerticalItem from './vertical/types/LinaNavVerticalItem';
import LinaNavVerticalLink from './vertical/types/LinaNavVerticalLink';
import { registerComponent } from './LinaNavItem';

const inputGlobalStyles = (
	<GlobalStyles
		styles={() => ({
			'.popper-navigation-list': {
				'& .lina-list-item': {
					padding: '8px 12px 8px 12px',
					height: 40,
					minHeight: 40,
					'& .lina-list-item-text': {
						padding: '0 0 0 8px'
					}
				},
				'&.dense': {
					'& .lina-list-item': {
						minHeight: 32,
						height: 32,
						'& .lina-list-item-text': {
							padding: '0 0 0 8px'
						}
					}
				}
			}
		})}
	/>
);
/*
Register Lina Navigation Components
 */
registerComponent('vertical-group', LinaNavVerticalGroup);
registerComponent('vertical-collapse', LinaNavVerticalCollapse);
registerComponent('vertical-item', LinaNavVerticalItem);
registerComponent('vertical-link', LinaNavVerticalLink);
registerComponent('horizontal-group', LinaNavHorizontalGroup);
registerComponent('horizontal-collapse', LinaNavHorizontalCollapse);
registerComponent('horizontal-item', LinaNavHorizontalItem);
registerComponent('horizontal-link', LinaNavHorizontalLink);
registerComponent('divider', () => <Divider className="my-16" />);
registerComponent('vertical-divider', () => <Divider className="my-16" />);
registerComponent('horizontal-divider', () => <Divider className="my-16" />);

/**
 * LinaNavigation
 * Component for displaying a navigation bar which contains LinaNavItem components
 * and acts as parent for providing props to its children components
 */
function LinaNavigation(props) {
	const { navigation, layout = 'vertical' } = props;

	if (!navigation || navigation.length === 0) {
		return null;
	}

	return (
		<>
			{inputGlobalStyles}
			{layout === 'horizontal' && (
				<LinaNavHorizontalLayout1
					checkPermission={false}
					{...props}
				/>
			)}
			{layout === 'vertical' && (
				<LinaNavVerticalLayout1
					checkPermission={false}
					{...props}
				/>
			)}
			{layout === 'vertical-2' && (
				<LinaNavVerticalLayout2
					checkPermission={false}
					{...props}
				/>
			)}
		</>
	);
}

export default memo(LinaNavigation);
