import { useMemo } from 'react';
import { BreadCrumb as PrimeBreadCrumb } from 'primereact/breadcrumb';
import { useNavigate } from 'react-router-dom';
import { useTheme } from "../../hooks/theme/useTheme";

export default function BreadCrumb({ paths }) {
  const navigate = useNavigate();
  const { theme } = useTheme();

  const home = { icon: 'pi pi-home' };

  const items = useMemo(() => {
    return paths.map(path => ({
      label: path.label,
      command: () => {
        if (path.url) navigate(path.url);
      }
    }));
  }, [paths, navigate]);

  const breadcrumbActive = theme?.breadcrumbActive || theme?.accentColor || "#1769AA";
  const breadcrumbText = theme?.breadcrumbText || "#64748B";
  const breadcrumbSeparator = theme?.breadcrumbSeparator || "#94A3B8";

  return (
    <div className="mb-4">
      <PrimeBreadCrumb
        model={items}
        home={home}
        className="bg-transparent border-none pb-1"
        pt={{
          root: {
            className: 'bg-transparent border-none p-0 m-0',
            style: { '--breadcrumb-divider-color': breadcrumbSeparator }
          },
          menu: { className: 'm-0 p-0' },
          action: {
            style: {
              color: breadcrumbText,
              transition: 'color 0.2s',
            },
            className: 'text-sm font-medium',
          },
          separator: {
            style: { color: breadcrumbSeparator },
            className: 'mx-2 text-xs',
          },
          itemActive: {
            style: { color: breadcrumbActive },
          }
        }}
      />
    </div>
  );
}