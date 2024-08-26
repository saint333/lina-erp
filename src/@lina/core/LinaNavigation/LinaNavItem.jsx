const components = {};
/**
 * Register a component to LinaNavItem.
 */
export function registerComponent(name, Component) {
	components[name] = Component;
}
/**
Component to render NavItem depending on its type.
*/
export default function LinaNavItem(props) {
	const { type } = props;
	const C = components[type];
	return C ? <C {...props} /> : null;
}
