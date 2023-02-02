import React, { createContext, useContext, useState } from "react";

const GlobalContext = createContext();

export const useGlobalContext = () => useContext(GlobalContext);

export const GlobalProvider = ({ children }) => {
    const [user, setUser] = useState({
        username: null,
        token: null,
        loggedIn: false,
    })



    return (
        <GlobalContext.Provider
            value={{ user, setUser }}
            >
                {children}
        </GlobalContext.Provider>
    )
}