import { themes } from "../../components/Theme/themes";
import { useRecoilState } from "recoil";
import { themeState } from "../../state/themeState/themeState";
export const useTheme = () => {
  const [theme, setTheme] = useRecoilState(themeState);

  const switchTheme = (company) => {
    setTheme(themes[company]);
  };

  return { theme, switchTheme };
};
