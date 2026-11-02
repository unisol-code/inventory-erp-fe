import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { useTheme } from "../../hooks/theme/useTheme";
import { useMemo } from 'react';

export default function Table({
  data = [],
  columns = [],
  loading = false,
  emptyMessage = "No records found.",
  className = "",
  ...props
}) {
  const { theme } = useTheme();

  const tableStyles = useMemo(() => {
    const primary = theme?.primaryColor || "#4FA8E5";
    const accent = theme?.accentColor || primary;
    return {
      cardBg: theme?.cardBg || "#FFFFFF",
      cardBorder: theme?.tableBorder || "#E5EAF0",
      tableHeaderBg: theme?.tableHeaderBg || `${primary}1A`,
      tableHeaderText: theme?.tableHeaderText || "#17365D",
      tableRowBg: theme?.tableRowBg || "#FFFFFF",
      tableRowHover: theme?.tableRowHover || `${primary}0A`,
      tableRowSelected: theme?.tableRowSelected || `${primary}1A`,
      tableBorder: theme?.tableBorder || "#E5EAF0",
      tableText: theme?.tableText || "#334155",
      focusedRow: theme?.tableRowHover || `${accent}0A`,
    };
  }, [theme]);

  return (
    <div
      className={`rounded-2xl border overflow-hidden ${className}`}
      style={{
        backgroundColor: tableStyles.cardBg,
        borderColor: tableStyles.cardBorder,
        boxShadow: "0 1px 3px rgba(0,0,0,0.05)",
      }}
    >
      <DataTable
        value={data}
        loading={loading}
        responsiveLayout="scroll"
        stripedRows
        scrollable
        emptyMessage={
          <div className="flex flex-col items-center justify-center py-12">
            <i className="pi pi-inbox text-5xl mb-3" style={{ color: tableStyles.tableBorder }} />
            <p className="font-medium" style={{ color: tableStyles.tableText }}>
              {emptyMessage}
            </p>
          </div>
        }
        pt={{
          root: {
            style: { width: "100%" }
          },
          wrapper: {
            className: "overflow-x-auto"
          },
          table: {
            className: "w-full"
          },
          headerRow: {
            style: {
              backgroundColor: tableStyles.tableHeaderBg,
              color: tableStyles.tableHeaderText,
              boxShadow: "0 1px 2px rgba(0,0,0,0.03)",
            }
          },
          headerCell: {
            style: {
              backgroundColor: tableStyles.tableHeaderBg,
              color: tableStyles.tableHeaderText,
              borderBottom: `2px solid ${tableStyles.tableBorder}`,
              padding: "14px 20px",
            },
            className: "text-sm font-semibold whitespace-nowrap",
          },
          bodyRow: {
            style: {
              borderBottom: `1px solid ${tableStyles.tableBorder}`,
            },
            className: "transition-colors duration-200",
          },
          bodyRowHover: {
            style: {
              backgroundColor: tableStyles.tableRowHover,
            }
          },
          bodyRowSelected: {
            style: {
              backgroundColor: tableStyles.tableRowSelected,
            }
          },
          bodyCell: {
            style: {
              borderBottom: `1px solid ${tableStyles.tableBorder}`,
              padding: "14px 20px",
              color: tableStyles.tableText,
            },
            className: "text-sm"
          },
          loadingOverlay: {
            style: {
              backgroundColor: `${tableStyles.cardBg}CC`,
            }
          }
        }}
        {...props}
      >
        {columns.map((col, index) => (
          <Column
            key={index}
            field={col.field}
            header={col.header}
            body={col.body}
            sortable={col.sortable}
            style={{
              minWidth: col.minWidth || "100px",
              padding: "18px 20px",
              ...col.style
            }}
            className={col.className}
            headerClassName={col.headerClassName}
            pt={{
              headerContent: { className: 'flex items-center gap-1' },
            }}
          />
        ))}
      </DataTable>
    </div>
  );
}