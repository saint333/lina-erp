import i18next from 'i18next';
import ar from './navigation-i18n/ar';
import en from './navigation-i18n/en';
import tr from './navigation-i18n/tr';

i18next.addResourceBundle('en', 'navigation', en);
i18next.addResourceBundle('tr', 'navigation', tr);
i18next.addResourceBundle('ar', 'navigation', ar);
/**
 * The navigationConfig object is an array of navigation items for the Fuse application.
 */
const navigationConfig = [
	{
		id: 'dashboard',
		title: 'Dashboard',
		subtitle: '',
		type: 'group',
		icon: 'heroicons-outline:home',
		translate: 'DASHBOARDS',
		children: [
			{
				id: 'dashboard.index',
				title: 'Dashboard',
				type: 'item',
				icon: 'heroicons-outline:home',
				url: '/dashboard'
			},
		]
	},
	{
		id: 'maintenance',
		title: 'Mantenimiento',
		subtitle: '',
		type: 'group',
		icon: 'heroicons-outline:home',
		translate: 'MAINTENANCE',
		children: [
			{
				id: 'maintenance.suppliers',
				title: 'Proveedores',
				type: 'item',
				icon: 'heroicons-outline:home',
				url: '/maintenance/suppliers'
			},
			{
				id: 'maintenance.clients',
				title: 'Clientes',
				type: 'collapse',
				icon: 'heroicons-outline:home',
				children: [
					{
						id: 'maintenance.list',
						title: 'Clientes',
						type: 'item',
						icon: 'heroicons-outline:home',
						url: '/maintenance/client/list'
					},
					{
						id: 'maintenance.card',
						title: 'Clientes',
						type: 'item',
						icon: 'heroicons-outline:home',
						url: '/maintenance/client/card'
					},
					{
						id: 'maintenance.license',
						title: 'Clientes',
						type: 'item',
						icon: 'heroicons-outline:home',
						url: '/maintenance/client/license'
					},
					{
						id: 'maintenance.resolution',
						title: 'Clientes',
						type: 'item',
						icon: 'heroicons-outline:home',
						url: '/maintenance/client/resolution'
					},
				]
			},
			{
				id: 'maintenance.products',
				title: 'Productos',
				type: 'item',
				icon: 'heroicons-outline:home',
				url: '/maintenance/products'
			},
		]
	},
];
export default navigationConfig;
