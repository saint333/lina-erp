import clsx from 'clsx';

/**
 * The LinaPageSimpleHeader component is a sub-component of the LinaPageSimple layout component.
 * It provides a header area for the layout.
 */
function LinaPageSimpleHeader(props) {
	const { header = null, className } = props;
	return (
		<div className={clsx('LinaPageSimple-header', className)}>
			<div className="container">{header}</div>
		</div>
	);
}

export default LinaPageSimpleHeader;
