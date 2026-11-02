import { useMemo } from 'react';
import { Button as PrimeButton } from 'primereact/button';
import { useTheme } from "../../hooks/theme/useTheme";

export default function Button({ label, icon, onClick, type = 'button', variant = 'primary', className = '', loading = false, disabled = false, ...props }) {
  const { theme } = useTheme();

  const baseClasses = "py-2 px-4 rounded-lg font-semibold transition-colors flex items-center justify-center gap-2 shadow-sm border focus:ring-2 focus:ring-offset-1 focus:outline-none";

  const styles = useMemo(() => {
    const primaryBg = theme?.buttonPrimary || theme?.primaryColor || "#4FA8E5";
    const primaryHover = theme?.buttonPrimaryHover || theme?.primaryColor || "#4FA8E5";
    const primaryText = theme?.buttonPrimaryText || "#FFFFFF";
    const dangerBg = theme?.buttonDanger || "#B42318";
    const dangerHover = theme?.buttonDangerHover || "#912018";
    const secondaryBg = theme?.buttonSecondaryBg || "#FFFFFF";
    const secondaryText = theme?.buttonSecondaryText || "#475569";
    const secondaryBorder = theme?.buttonSecondaryBorder || "#CBD5E1";
    const inputFocus = theme?.inputFocusBorder || primaryBg;

    switch (variant) {
      case 'secondary':
        return {
          backgroundColor: secondaryBg,
          color: secondaryText,
          borderColor: secondaryBorder,
          borderWidth: "1px",
          '&:hover': { backgroundColor: theme?.sidebarHover || '#F0F7FF' },
          focusRing: inputFocus,
        };
      case 'danger':
        return {
          backgroundColor: dangerBg,
          color: primaryText,
          borderColor: dangerBg,
          borderWidth: "1px",
          '&:hover': { backgroundColor: dangerHover },
          focusRing: dangerHover,
        };
      case 'success':
        return {
          backgroundColor: theme?.successColor || "#15803D",
          color: primaryText,
          borderColor: theme?.successColor || "#15803D",
          borderWidth: "1px",
          '&:hover': { backgroundColor: theme?.successColor || "#126f30" },
          focusRing: theme?.successColor || "#15803D",
        };
      case 'text':
        return {
          backgroundColor: "transparent",
          color: theme?.accentColor || theme?.primaryColor || "#4FA8E5",
          borderColor: "transparent",
          borderWidth: "1px",
          '&:hover': { backgroundColor: theme?.sidebarHover || '#F0F7FF' },
          focusRing: inputFocus,
        };
      case 'primary':
      default:
        return {
          backgroundColor: primaryBg,
          color: primaryText,
          borderColor: primaryBg,
          borderWidth: "1px",
          '&:hover': { backgroundColor: primaryHover },
          focusRing: inputFocus,
        };
    }
  }, [theme, variant]);

  const hoverClasses = {
    primary: "hover:opacity-90",
    secondary: "hover:bg-opacity-90",
    danger: "hover:opacity-90",
    success: "hover:opacity-90",
    text: "",
  };

  return (
    <PrimeButton
      label={label}
      icon={icon}
      onClick={onClick}
      type={type}
      loading={loading}
      disabled={disabled || loading}
      style={{
        backgroundColor: styles.backgroundColor,
        color: styles.color,
        borderColor: styles.borderColor,
        borderWidth: styles.borderWidth,
        boxShadow: `0 1px 3px ${styles.backgroundColor}33`,
      }}
      className={`${baseClasses} ${hoverClasses[variant]} ${variant === 'primary' ? 'scale-[1.02]' : ''} ${className}`}
      pt={{
        label: { className: 'font-semibold' },
        icon: { className: 'text-sm' },
        loading: { className: 'mr-2' },
      }}
      {...props}
    />
  );
}
