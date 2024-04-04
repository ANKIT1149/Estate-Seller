/* eslint-disable react/prop-types */
"use client"

import { useState } from "react";
import ThemeContext from "./ThemeContext";

const ThemeProvider = ({children}) => {
    const [mode, setMode] = useState("light");
    const toggleMode = () => {
         if (mode === 'light') {
            setMode('dark')
            document.body.style.background = "black";
         } else {
            setMode('light')
            document.body.style.background = "white"
         }
    };

    return(
        <ThemeContext.Provider value={{mode, toggleMode}}>
             {children}
        </ThemeContext.Provider>
    )
} ;

export default ThemeProvider;