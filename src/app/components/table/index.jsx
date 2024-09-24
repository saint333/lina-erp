import {
  MaterialReactTable,
  useMaterialReactTable,
} from "material-react-table";
import DataTableTopToolbar from "./DataTableTopToolbar";
import { useState } from "react";
import { MRT_Localization_ES } from "material-react-table/locales/es";

function Table({ columns = [], data = [], acciones, loading, pageSize, rowSelection, ...rest }) {
  const [states, setStates] = useState({
    enableGrouping: true,
    enableColumnPinning: true,
    enableRowActions: true,
    muiTablePaperProps: {
      elevation: 0,
      square: true,
      className: "flex flex-col flex-auto h-full",
    },
    muiTableContainerProps: {
      className: "flex-auto",
      sx: {
        "& + div": {
          minHeight: "4.5rem",
        },
      },
    },
    enableStickyHeader: true,
    paginationDisplayMode: "pages",
    positionToolbarAlertBanner: "top",
    muiPaginationProps: {
      color: "secondary",
      rowsPerPageOptions: [5, 10, 20, 30],
      shape: "rounded",
      variant: "outlined",
      showRowsPerPage: false,
    },
    muiSearchTextFieldProps: {
      placeholder: "Buscar",
      sx: { minWidth: "300px" },
      variant: "outlined",
      size: "small",
    },
    muiFilterTextFieldProps: {
      variant: "outlined",
      size: "small",
      sx: {
        "& .MuiInputBase-root": {
          padding: "0px 8px",
          height: "32px!important",
          minHeight: "32px!important",
        },
      },
    },
    muiSelectAllCheckboxProps: {
      className: "w-48",
    },
    muiSelectCheckboxProps: {
      className: "w-48",
    },
    muiTableBodyRowProps: ({ row, table }) => {
      const { density } = table.getState();

      if (density === "compact") {
        return {
          sx: {
            backgroundColor: "initial",
            opacity: 1,
            boxShadow: "none",
            height: row.getIsPinned() ? `${37}px` : undefined,
          },
        };
      }

      return {
        sx: {
          backgroundColor: "initial",
          opacity: 1,
          boxShadow: "none",
          // Set a fixed height for pinned rows
          height: row.getIsPinned()
            ? `${density === "comfortable" ? 53 : 69}px`
            : undefined,
        },
      };
    },
    muiTableHeadCellProps: ({ column }) => ({
      sx: {
        "& .Mui-TableHeadCell-Content-Labels": {
          flex: 1,
          justifyContent: "space-between",
        },
        "& .Mui-TableHeadCell-Content-Actions": {},
        "& .MuiFormHelperText-root": {
          textAlign: "center",
          marginX: 0,
          color: (theme) => theme.palette.text.disabled,
          fontSize: 11,
        },
        backgroundColor: (theme) =>
          column.getIsPinned() ? theme.palette.background.paper : "inherit",
      },
    }),
    mrtTheme: (theme) => ({
      baseBackgroundColor: theme.palette.background.paper,
      menuBackgroundColor: theme.palette.background.paper,
      pinnedRowBackgroundColor: theme.palette.background.paper,
      pinnedColumnBackgroundColor: theme.palette.background.paper,
    }),
    renderTopToolbar: (_props) => <DataTableTopToolbar {..._props} />,
  });
  const table = useMaterialReactTable({
    columns,
    data,
    enableColumnActions: false,
    localization: { ...MRT_Localization_ES, actions: "..." },
    initialState: {
      density: "comfortable",
      showGlobalFilter: true,
      columnPinning: {
        left: ["mrt-row-expand", "mrt-row-select"],
        right: ["mrt-row-actions"],
      },
      pagination: {
        pageSize: pageSize || 10,
        
      },
    },
    renderTopToolbarCustomActions: (_props) => {
      return acciones;
    },
    ...states,
    state: {
      isLoading: loading,
      showLoadingOverlay: false,
      ...rowSelection && { rowSelection }
    },
    ...rest,
    
  });

  return <MaterialReactTable table={table} />;
}

export default Table;
