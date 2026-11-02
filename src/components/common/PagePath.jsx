import { useMemo } from 'react';
import Button from './Button';
import { useTheme } from "../../hooks/theme/useTheme";

export default function PagePath({
  title,
  showAddButton = false,
  onAdd,
  addButtonLabel = "Add",
  showSearchBar = false,
  searchValue = "",
  onSearch,
  searchPlaceholder = "Search...",
  children
}) {
  const { theme } = useTheme();

  const styles = useMemo(() => ({
    cardBg: theme?.cardBg || "#FFFFFF",
    cardBorder: theme?.cardBorder || "#E5EAF0",
    pageTitle: theme?.pageTitle || "#17365D",
    inputBg: theme?.inputBg || "#FFFFFF",
    inputText: theme?.inputText || "#334155",
    inputBorder: theme?.inputBorder || "#CBD5E1",
    inputFocusBorder: theme?.inputFocusBorder || theme?.primaryColor || "#4FA8E5",
    placeholderText: theme?.placeholderText || "#94A3B8",
    iconColor: theme?.tableMutedText || "#64748B",
  }), [theme]);

  return (
    <div
      className="py-3 px-6 flex flex-col lg:flex-row lg:items-center lg:justify-between rounded-xl shadow-sm border gap-2 mb-4"
      style={{
        backgroundColor: styles.cardBg,
        borderColor: styles.cardBorder,
      }}
    >
      <h1 className="text-2xl font-bold" style={{ color: styles.pageTitle }}>
        {title}
      </h1>

      <div className="flex flex-wrap items-center gap-3">
        {showSearchBar && (
          <div className="relative">
            <i
              className="pi pi-search absolute left-3 top-1/2 -translate-y-1/2"
              style={{ color: styles.iconColor }}
            />
            <input
              type="text"
              value={searchValue}
              placeholder={searchPlaceholder}
              onChange={(e) => onSearch?.(e.target.value)}
              className="w-72 pl-10 pr-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-offset-1"
              style={{
                backgroundColor: styles.inputBg,
                color: styles.inputText,
                borderColor: styles.inputBorder,
                borderWidth: "1px",
                "--tw-placeholder-opacity": 1,
                "--tw-ring-color": styles.inputFocusBorder,
              }}
            />
          </div>
        )}

        {children}

        {showAddButton && (
          <Button
            label={addButtonLabel}
            icon="pi pi-plus"
            variant="primary"
            onClick={onAdd}
          />
        )}
      </div>
    </div>
  );
}