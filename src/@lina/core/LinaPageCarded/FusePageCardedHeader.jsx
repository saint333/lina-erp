import clsx from 'clsx';

/**
 * The LinaPageCardedHeader component is a header for the LinaPageCarded component.
 */
function LinaPageCardedHeader(props) {
	const { header = null } = props;
	return <div className={clsx('LinaPageCarded-header', 'container')}>{header}</div>;
}

export default LinaPageCardedHeader;
