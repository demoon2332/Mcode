// ThemeProvider.js
import React, { useState, useEffect, createContext, useContext } from "react";
import { useLocation } from "react-router-dom";

const ThemeContext = createContext();

const ThemeProvider = ({ children }) => {
  const location = useLocation();

  useEffect(() => {
    const isHomePage = location.pathname === "/";
    if (isHomePage) {
      document.body.style.setProperty("background-image", "var(--themeHomePage)");
    }
    else if(location.pathname === "*"){
      document.body.style.setProperty("background-image", "");
    }
    else{
      document.body.style.setProperty("background-image", "var(--theme)");
    }
  }, [location.pathname]);

  return (
    <ThemeContext.Provider value={ThemeContext}>{children}</ThemeContext.Provider>
  );
};

export default ThemeProvider ;
