import LinaScrollbars from '@lina/core/LinaScrollbars';

/**
 * The LinaPageSimpleSidebarContent component is a content container for the LinaPageSimpleSidebar component.
 */
function LinaPageSimpleSidebarContent(props) {
	const { innerScroll, children } = props;

	if (!children) {
		return null;
	}

	return (
		<LinaScrollbars enable={innerScroll}>
			<div className="LinaPageSimple-sidebarContent">{children}</div>
		</LinaScrollbars>
	);
}

export default LinaPageSimpleSidebarContent;
