import _ from '@lodash';

/**
 *  LinaNavItemModel
 *  Constructs a navigation item based on LinaNavItemType
 */
function LinaNavItemModel(data) {
	data = data || {};
	return _.defaults(data, {
		id: _.uniqueId(),
		title: '',
		translate: '',
		auth: null,
		subtitle: '',
		icon: '',
		iconClass: '',
		url: '',
		target: '',
		type: 'item',
		sx: {},
		disabled: false,
		active: false,
		exact: false,
		end: false,
		badge: null,
		children: []
	});
}

export default LinaNavItemModel;
