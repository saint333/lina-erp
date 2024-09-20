import i18next from "i18next";
import ar from "./navigation-i18n/ar";
import en from "./navigation-i18n/en";
import tr from "./navigation-i18n/tr";

i18next.addResourceBundle("en", "navigation", en);
i18next.addResourceBundle("tr", "navigation", tr);
i18next.addResourceBundle("ar", "navigation", ar);
/**
 * The navigationConfig object is an array of navigation items for the Lina application.
 */
const navigationConfig = [
  {
    id: "dashboard",
    title: "Dashboard",
    subtitle: "",
    type: "group",
    icon: "heroicons-outline:home",
    children: [
      {
        id: "dashboard.index",
        title: "Dashboard",
        type: "item",
        icon: "heroicons-outline:home",
        url: "/dashboard",
      },
    ],
  },
  {
    id: "sistema",
    title: "Sistema Integral",
    subtitle: "",
    type: "group",
    icon: "heroicons-outline:home",
    children: [
      {
        id: "maintenance",
        title: "Mantenimiento",
        subtitle: "",
        type: "collapse",
        icon: "heroicons-outline:home",
        children: [
          {
            id: "maintenance.suppliers",
            title: "Proveedores",
            type: "item",
            icon: "heroicons-outline:home",
            url: "/maintenance/suppliers",
          },
          {
            id: "maintenance.clients",
            title: "Clientes",
            type: "collapse",
            icon: "heroicons-outline:home",
            children: [
              {
                id: "maintenance.list",
                title: "Clientes",
                type: "item",
                icon: "heroicons-outline:home",
                url: "/maintenance/client/list",
              },
              {
                id: "maintenance.card",
                title: "Tarjeta",
                type: "item",
                icon: "heroicons-outline:home",
                url: "/maintenance/client/card",
              },
              {
                id: "maintenance.license",
                title: "Licencia",
                type: "item",
                icon: "heroicons-outline:home",
                url: "/maintenance/client/license",
              },
              {
                id: "maintenance.resolution",
                title: "Resolución",
                type: "item",
                icon: "heroicons-outline:home",
                url: "/maintenance/client/resolution",
              },
            ],
          },
          {
            id: "maintenance.products",
            title: "Productos",
            type: "item",
            icon: "heroicons-outline:home",
            url: "/maintenance/products",
          },
          {
            id: "maintenance.various",
            title: "Varios",
            type: "item",
            icon: "heroicons-outline:home",
            url: "/maintenance/various",
          },
        ],
      },
      {
        id: "management",
        title: "Gestión",
        subtitle: "",
        type: "collapse",
        icon: "heroicons-outline:home",
        children: [
          {
            id: "management.products",
            title: "Productos",
            type: "item",
            icon: "heroicons-outline:home",
            url: "/management/products",
          },
          {
            id: "management.exhibition",
            title: "Exhibición",
            type: "item",
            icon: "heroicons-outline:home",
            url: "/management/exhibition",
          },
          {
            id: "management.entry",
            title: "Entrada",
            type: "item",
            icon: "heroicons-outline:home",
            url: "/management/entry",
          },
          {
            id: "management.exit",
            title: "Salida",
            type: "item",
            icon: "heroicons-outline:home",
            url: "/management/exit",
          },
        ],
      },
      {
        id: "sales",
        title: "Ventas",
        subtitle: "",
        type: "collapse",
        icon: "heroicons-outline:home",
        children: [
          {
            id: "sales.consult",
            title: "Ordenes",
            type: "item",
            icon: "heroicons-outline:home",
            url: "/sales/consult",
          },
          {
            id: "sales.guide",
            title: "Facturas",
            type: "item",
            icon: "heroicons-outline:home",
            url: "/sales/guide",
          },
        ],
      },
      {
        id: "administration",
        title: "Administración",
        subtitle: "",
        type: "collapse",
        icon: "heroicons-outline:home",
        children: [
          {
            id: "administration.vehicles",
            title: "Vehículos",
            type: "item",
            icon: "heroicons-outline:home",
            url: "/administration/vehicles",
          },
          {
            id: "administration.driver",
            title: "Conductores",
            type: "item",
            icon: "heroicons-outline:home",
            url: "/administration/driver",
          },
          {
            id: "administration.carrier",
            title: "Trasportistas",
            type: "item",
            icon: "heroicons-outline:home",
            url: "/administration/carrier",
          },
        ],
      },
    ],
  },
  {
    id: "crm",
    title: "CRM",
    subtitle: "",
    type: "group",
    icon: "heroicons-outline:home",
    children: [
      {
        id: "crm.index",
        title: "Whastapp",
        type: "item",
        icon: "heroicons-outline:home",
        url: "/crm",
      },
    ],
  }
];
export default navigationConfig;
