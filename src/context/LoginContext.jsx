/* eslint-disable react/prop-types */
import { onAuthStateChanged } from "firebase/auth";
import { createContext, useEffect, useState } from "react";
import { auth } from "../firebase";

export const LoginContext = createContext();


const LoginContextProvider = ({ children }) => {
    const [activeUser, setActiveUser] = useState({})

    useEffect(() => {
        const unsub = onAuthStateChanged(auth, (user) => {
            setActiveUser(user)
        });

        return () => {
            unsub();
        }
    }, []);

    return (
        <LoginContext.Provider value={activeUser}>
            {children}
        </LoginContext.Provider>
    );
}

export default LoginContextProvider;