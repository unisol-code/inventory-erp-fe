// themeAtom.js
import { atom } from "recoil";
import { themes } from "../../components/Theme/themes";

export const themeState = atom({
  key: "themeState", // unique ID (with respect to other atoms/selectors)
  default: themes.Unisol, // default theme
});
