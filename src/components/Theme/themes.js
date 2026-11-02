
import surgisolLogoImage from "../../assets/images/surgisol.png";
import igniteSphereLogoImage from "../../assets/images/igniteSphere.png";
import unisolServicesImg from "../../assets/images/unisolservices.png";
import enviroSolutionsImg from "../../assets/images/enviroSolutions.png";
import backgroundIgniteImg from "../../assets/images/backgroundIgnite.png";

export const themes = {
  // =========================================================
  // UNISOL / HOME THEME
  // Brand: Sky Blue
  // =========================================================
  Unisol: {
    // BRAND COLORS
    primaryColor: "#4FA8E5", // Primary buttons, links, loaders, primary actions
    secondaryColor: "#89CFF0", // Secondary highlights and supporting UI elements
    bgSidebar: "#D3EDFD", // Sidebar background
    backgroundColor: "#F3F8FC", // Main application/page background
    highlightColor: "#DCEEFF", // Active module, selected item and selected menu
    accentColor: "#1C5CD6", // Strong accent, active text and important links

    // SIDEBAR COLORS
    sidebarText: "#344D65", // Normal sidebar menu text
    sidebarIcon: "#536B82", // Normal sidebar icons
    sidebarHover: "#EAF6FF", // Sidebar item hover background
    activeModuleBg: "#DCEEFF", // Expanded/active parent module background
    activeModuleText: "#1769AA", // Active parent module text and icon
    activeSubModuleBg: "#EAF4FC", // Selected sub-module background
    activeSubModuleText: "#1769AA", // Selected sub-module text
    activeIndicator: "#4FA8E5", // Left border/indicator for selected sub-module
    sidebarDivider: "#B8D9ED", // Sidebar separators

    // BREADCRUMB AND PAGE HEADER
    breadcrumbText: "#64748B", // Previous breadcrumb items
    breadcrumbSeparator: "#94A3B8", // Breadcrumb separator icons
    breadcrumbActive: "#1769AA", // Current breadcrumb
    pageTitle: "#17365D", // Page titles and main headings
    pageDescription: "#64748B", // Page subtitles and descriptions

    // BUTTONS AND INTERACTIVE ELEMENTS
    buttonPrimary: "#4FA8E5", // Save, Create, Submit, Add
    buttonPrimaryHover: "#328FCF", // Primary button hover
    buttonPrimaryText: "#FFFFFF", // Primary button text
    buttonSecondaryBg: "#FFFFFF", // Cancel, Back, Reset
    buttonSecondaryText: "#334155", // Secondary button text
    buttonSecondaryBorder: "#CBD5E1", // Secondary button border
    buttonDanger: "#B42318", // Delete, Remove, Revoke
    buttonDangerHover: "#912018", // Danger button hover
    buttonDisabledBg: "#E2E8F0", // Disabled button background
    buttonDisabledText: "#94A3B8", // Disabled button text
    focusRing: "#4FA8E533", // Input/button focus ring with transparency

    // TABLE COLORS
    tableHeaderBg: "#DCEEFF", // Table column header background
    tableHeaderText: "#17365D", // Table header text
    tableRowBg: "#FFFFFF", // Normal table row
    tableRowAltBg: "#F8FAFC", // Optional alternating row background
    tableRowHover: "#F0F7FF", // Hovered row
    tableRowSelected: "#EAF4FC", // Selected row
    tableBorder: "#E5EAF0", // Table borders and row separators
    tableText: "#334155", // Table cell text
    tableMutedText: "#64748B", // Secondary table information
    paginationActiveBg: "#4FA8E5", // Active pagination button
    paginationActiveText: "#FFFFFF", // Active pagination text
    paginationBorder: "#CBD5E1", // Pagination borders

    // FORMS AND DROPDOWNS
    inputBg: "#FFFFFF", // Input and textarea backgrounds
    inputText: "#334155", // Input values
    inputBorder: "#CBD5E1", // Default input border
    inputFocusBorder: "#4FA8E5", // Focused input border
    placeholderText: "#94A3B8", // Input placeholder
    dropdownBg: "#FFFFFF", // Dropdown menu background
    dropdownHover: "#F0F7FF", // Dropdown option hover
    dropdownSelected: "#DCEEFF", // Selected dropdown option

    // CARDS AND GENERAL CONTENT
    cardBg: "#FFFFFF", // Dashboard cards, panels, modals
    cardBorder: "#E5EAF0", // Card borders
    textColor: "#334155", // General body text
    headingColor: "#17365D", // Card and section headings
    mutedText: "#64748B", // Secondary text, descriptions, timestamps
    dividerColor: "#E5EAF0", // Content dividers
    shadowColor: "#17365D0D", // Optional subtle shadows

    // STATUS COLORS — keep consistent across all companies
    successColor: "#15803D", // Success messages and completed status
    successBg: "#DCFCE7",
    warningColor: "#B45309", // Warnings and pending status
    warningBg: "#FEF3C7",
    errorColor: "#B42318", // Errors and failed status
    errorBg: "#FEE2E2",
    infoColor: "#1769AA", // Information messages
    infoBg: "#EAF4FC",

    // BRAND ASSETS
    logoImage: unisolServicesImg,
    // No background image; use backgroundColor for the page.
  },

  // =========================================================
  // SURGISOL THEME
  // Brand: Warm Peach
  // =========================================================
  Surgisol: {
    // BRAND COLORS
    primaryColor: "#C6693C", // Primary buttons and main actions
    secondaryColor: "#FFE0B2", // Secondary highlights
    bgSidebar: "#E8B59F", // Sidebar background
    backgroundColor: "#FCF7F4", // Main application background
    highlightColor: "#FBE0D4", // Active module and selected item
    accentColor: "#A54A29", // Active text, icons and links

    // SIDEBAR COLORS
    sidebarText: "#5C382B",
    sidebarIcon: "#805642",
    sidebarHover: "#FFF2EA",
    activeModuleBg: "#FBE0D4",
    activeModuleText: "#A54A29",
    activeSubModuleBg: "#FFF2EA",
    activeSubModuleText: "#A54A29",
    activeIndicator: "#C6693C",
    sidebarDivider: "#D7A38B",

    // BREADCRUMB AND PAGE HEADER
    breadcrumbText: "#80685D",
    breadcrumbSeparator: "#A58D80",
    breadcrumbActive: "#A54A29",
    pageTitle: "#6E3824",
    pageDescription: "#80685D",

    // BUTTONS
    buttonPrimary: "#C6693C",
    buttonPrimaryHover: "#AD552D",
    buttonPrimaryText: "#FFFFFF",
    buttonSecondaryBg: "#FFFFFF",
    buttonSecondaryText: "#5C382B",
    buttonSecondaryBorder: "#D9C7BD",
    buttonDanger: "#B42318",
    buttonDangerHover: "#912018",
    buttonDisabledBg: "#E2E8F0",
    buttonDisabledText: "#94A3B8",
    focusRing: "#C6693C33",

    // TABLE COLORS
    tableHeaderBg: "#FBE0D4",
    tableHeaderText: "#6E3824",
    tableRowBg: "#FFFFFF",
    tableRowAltBg: "#FCF8F6",
    tableRowHover: "#FFF2EA",
    tableRowSelected: "#FBE9E7",
    tableBorder: "#EDE2DC",
    tableText: "#473B36",
    tableMutedText: "#80685D",
    paginationActiveBg: "#C6693C",
    paginationActiveText: "#FFFFFF",
    paginationBorder: "#D9C7BD",

    // FORMS AND DROPDOWNS
    inputBg: "#FFFFFF",
    inputText: "#473B36",
    inputBorder: "#D9C7BD",
    inputFocusBorder: "#C6693C",
    placeholderText: "#A58D80",
    dropdownBg: "#FFFFFF",
    dropdownHover: "#FFF2EA",
    dropdownSelected: "#FBE0D4",

    // CARDS AND GENERAL CONTENT
    cardBg: "#FFFFFF",
    cardBorder: "#EDE2DC",
    textColor: "#473B36",
    headingColor: "#6E3824",
    mutedText: "#80685D",
    dividerColor: "#EDE2DC",
    shadowColor: "#6E38240D",

    // STATUS COLORS — shared across companies
    successColor: "#15803D",
    successBg: "#DCFCE7",
    warningColor: "#B45309",
    warningBg: "#FEF3C7",
    errorColor: "#B42318",
    errorBg: "#FEE2E2",
    infoColor: "#1769AA",
    infoBg: "#EAF4FC",

    // BRAND ASSETS
    logoImage: surgisolLogoImage,
  },

  // =========================================================
  // ENVIROSOLUTION THEME
  // Brand: Sage Green
  // =========================================================
  Envirosolution: {
    // BRAND COLORS
    primaryColor: "#4A7E4C",
    secondaryColor: "#BBDBC0",
    bgSidebar: "#DBE3D3",
    backgroundColor: "#F6FAF3",
    highlightColor: "#E2F0E2",
    accentColor: "#2D5D39",

    // SIDEBAR COLORS
    sidebarText: "#304A34",
    sidebarIcon: "#56705A",
    sidebarHover: "#F0F7EB",
    activeModuleBg: "#E2F0E2",
    activeModuleText: "#2D5D39",
    activeSubModuleBg: "#F0F7EB",
    activeSubModuleText: "#2D5D39",
    activeIndicator: "#4A7E4C",
    sidebarDivider: "#C3D0BC",

    // BREADCRUMB AND PAGE HEADER
    breadcrumbText: "#647466",
    breadcrumbSeparator: "#8A9B8C",
    breadcrumbActive: "#2D5D39",
    pageTitle: "#244A2B",
    pageDescription: "#647466",

    // BUTTONS
    buttonPrimary: "#4A7E4C",
    buttonPrimaryHover: "#38683A",
    buttonPrimaryText: "#FFFFFF",
    buttonSecondaryBg: "#FFFFFF",
    buttonSecondaryText: "#304A34",
    buttonSecondaryBorder: "#CBD5C6",
    buttonDanger: "#B42318",
    buttonDangerHover: "#912018",
    buttonDisabledBg: "#E2E8F0",
    buttonDisabledText: "#94A3B8",
    focusRing: "#4A7E4C33",

    // TABLE COLORS
    tableHeaderBg: "#E2F0E2",
    tableHeaderText: "#244A2B",
    tableRowBg: "#FFFFFF",
    tableRowAltBg: "#F8FAF6",
    tableRowHover: "#F0F7EB",
    tableRowSelected: "#E8F5E8",
    tableBorder: "#E2E8DC",
    tableText: "#354438",
    tableMutedText: "#647466",
    paginationActiveBg: "#4A7E4C",
    paginationActiveText: "#FFFFFF",
    paginationBorder: "#CBD5C6",

    // FORMS AND DROPDOWNS
    inputBg: "#FFFFFF",
    inputText: "#354438",
    inputBorder: "#CBD5C6",
    inputFocusBorder: "#4A7E4C",
    placeholderText: "#8A9B8C",
    dropdownBg: "#FFFFFF",
    dropdownHover: "#F0F7EB",
    dropdownSelected: "#E2F0E2",

    // CARDS AND GENERAL CONTENT
    cardBg: "#FFFFFF",
    cardBorder: "#E2E8DC",
    textColor: "#354438",
    headingColor: "#244A2B",
    mutedText: "#647466",
    dividerColor: "#E2E8DC",
    shadowColor: "#244A2B0D",

    // STATUS COLORS — shared across companies
    successColor: "#15803D",
    successBg: "#DCFCE7",
    warningColor: "#B45309",
    warningBg: "#FEF3C7",
    errorColor: "#B42318",
    errorBg: "#FEE2E2",
    infoColor: "#1769AA",
    infoBg: "#EAF4FC",

    // BRAND ASSETS
    logoImage: enviroSolutionsImg,
  },

  // =========================================================
  // IGNITESPHERE THEME
  // Brand: Indigo / Lavender
  // =========================================================
  Ignitesphere: {
    // BRAND COLORS
    primaryColor: "#9683EC",
    secondaryColor: "#D6D8FB",
    bgSidebar: "#E0E7FF",
    backgroundColor: "#F7F7FF",
    highlightColor: "#E8E5FF",
    accentColor: "#6366F1",

    // SIDEBAR COLORS
    sidebarText: "#37365B",
    sidebarIcon: "#68678B",
    sidebarHover: "#F0EEFF",
    activeModuleBg: "#E8E5FF",
    activeModuleText: "#4F46B8",
    activeSubModuleBg: "#F0EEFF",
    activeSubModuleText: "#4F46B8",
    activeIndicator: "#9683EC",
    sidebarDivider: "#C9CEF2",

    // BREADCRUMB AND PAGE HEADER
    breadcrumbText: "#6B728A",
    breadcrumbSeparator: "#969AB3",
    breadcrumbActive: "#4F46B8",
    pageTitle: "#373078",
    pageDescription: "#6B728A",

    // BUTTONS
    buttonPrimary: "#7661D6",
    buttonPrimaryHover: "#604CC0",
    buttonPrimaryText: "#FFFFFF",
    buttonSecondaryBg: "#FFFFFF",
    buttonSecondaryText: "#37365B",
    buttonSecondaryBorder: "#D2D4E8",
    buttonDanger: "#B42318",
    buttonDangerHover: "#912018",
    buttonDisabledBg: "#E2E8F0",
    buttonDisabledText: "#94A3B8",
    focusRing: "#9683EC33",

    // TABLE COLORS
    tableHeaderBg: "#E8E5FF",
    tableHeaderText: "#373078",
    tableRowBg: "#FFFFFF",
    tableRowAltBg: "#FAFAFF",
    tableRowHover: "#F0EEFF",
    tableRowSelected: "#EEEBFF",
    tableBorder: "#E5E5F2",
    tableText: "#3F405B",
    tableMutedText: "#6B728A",
    paginationActiveBg: "#7661D6",
    paginationActiveText: "#FFFFFF",
    paginationBorder: "#D2D4E8",

    // FORMS AND DROPDOWNS
    inputBg: "#FFFFFF",
    inputText: "#3F405B",
    inputBorder: "#D2D4E8",
    inputFocusBorder: "#9683EC",
    placeholderText: "#969AB3",
    dropdownBg: "#FFFFFF",
    dropdownHover: "#F0EEFF",
    dropdownSelected: "#E8E5FF",

    // CARDS AND GENERAL CONTENT
    cardBg: "#FFFFFF",
    cardBorder: "#E5E5F2",
    textColor: "#3F405B",
    headingColor: "#373078",
    mutedText: "#6B728A",
    dividerColor: "#E5E5F2",
    shadowColor: "#3730780D",

    // STATUS COLORS — shared across companies
    successColor: "#15803D",
    successBg: "#DCFCE7",
    warningColor: "#B45309",
    warningBg: "#FEF3C7",
    errorColor: "#B42318",
    errorBg: "#FEE2E2",
    infoColor: "#4F46B8",
    infoBg: "#EEEBFF",

    // BRAND ASSETS
    logoImage: igniteSphereLogoImage,
    backgroundImg: backgroundIgniteImg, // Optional company-specific background image
  },

  // =========================================================
  // HOME THEME
  // Same palette as Unisol
  // =========================================================
  Home: {
    // BRAND COLORS
    primaryColor: "#4FA8E5",
    secondaryColor: "#89CFF0",
    bgSidebar: "#D3EDFD",
    backgroundColor: "#F3F8FC",
    highlightColor: "#DCEEFF",
    accentColor: "#1C5CD6",

    // SIDEBAR COLORS
    sidebarText: "#344D65",
    sidebarIcon: "#536B82",
    sidebarHover: "#EAF6FF",
    activeModuleBg: "#DCEEFF",
    activeModuleText: "#1769AA",
    activeSubModuleBg: "#EAF4FC",
    activeSubModuleText: "#1769AA",
    activeIndicator: "#4FA8E5",
    sidebarDivider: "#B8D9ED",

    // BREADCRUMB AND PAGE HEADER
    breadcrumbText: "#64748B",
    breadcrumbSeparator: "#94A3B8",
    breadcrumbActive: "#1769AA",
    pageTitle: "#17365D",
    pageDescription: "#64748B",

    // BUTTONS
    buttonPrimary: "#4FA8E5",
    buttonPrimaryHover: "#328FCF",
    buttonPrimaryText: "#FFFFFF",
    buttonSecondaryBg: "#FFFFFF",
    buttonSecondaryText: "#334155",
    buttonSecondaryBorder: "#CBD5E1",
    buttonDanger: "#B42318",
    buttonDangerHover: "#912018",
    buttonDisabledBg: "#E2E8F0",
    buttonDisabledText: "#94A3B8",
    focusRing: "#4FA8E533",

    // TABLE COLORS
    tableHeaderBg: "#DCEEFF",
    tableHeaderText: "#17365D",
    tableRowBg: "#FFFFFF",
    tableRowAltBg: "#F8FAFC",
    tableRowHover: "#F0F7FF",
    tableRowSelected: "#EAF4FC",
    tableBorder: "#E5EAF0",
    tableText: "#334155",
    tableMutedText: "#64748B",
    paginationActiveBg: "#4FA8E5",
    paginationActiveText: "#FFFFFF",
    paginationBorder: "#CBD5E1",

    // FORMS AND DROPDOWNS
    inputBg: "#FFFFFF",
    inputText: "#334155",
    inputBorder: "#CBD5E1",
    inputFocusBorder: "#4FA8E5",
    placeholderText: "#94A3B8",
    dropdownBg: "#FFFFFF",
    dropdownHover: "#F0F7FF",
    dropdownSelected: "#DCEEFF",

    // CARDS AND GENERAL CONTENT
    cardBg: "#FFFFFF",
    cardBorder: "#E5EAF0",
    textColor: "#334155",
    headingColor: "#17365D",
    mutedText: "#64748B",
    dividerColor: "#E5EAF0",
    shadowColor: "#17365D0D",

    // STATUS COLORS — shared across companies
    successColor: "#15803D",
    successBg: "#DCFCE7",
    warningColor: "#B45309",
    warningBg: "#FEF3C7",
    errorColor: "#B42318",
    errorBg: "#FEE2E2",
    infoColor: "#1769AA",
    infoBg: "#EAF4FC",

    // BRAND ASSETS
    logoImage: unisolServicesImg,
  },
};
