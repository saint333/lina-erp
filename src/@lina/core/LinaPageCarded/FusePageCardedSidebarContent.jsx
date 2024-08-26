import LinaScrollbars from '@lina/core/LinaScrollbars';

/**
 * The LinaPageCardedSidebarContent component is a content container for the LinaPageCardedSidebar component.
 */
function LinaPageCardedSidebarContent(props) {
	const { innerScroll, children } = props;

	if (!children) {
		return null;
	}

	return (
		<LinaScrollbars enable={innerScroll}>
			<div className="LinaPageCarded-sidebarContent">{children}</div>
		</LinaScrollbars>
	);
}

export default LinaPageCardedSidebarContent;
