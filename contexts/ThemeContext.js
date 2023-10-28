import React, { createContext } from "react";
import images from "@common/All_Images";
import svgs from "@common/All_Svgs";
import theme from "@common/Theme";

const ThemeContext = createContext();

export function ThemeContextProvider(props) {
  return (
    <ThemeContext.Provider value={{ theme: theme, svgs: svgs, images: images }}>
      {props.children}
    </ThemeContext.Provider>
  );
}

export default ThemeContext;
