/* eslint-disable react/prop-types */
import { createContext, useContext, useReducer } from "react";
import { LoginContext } from "./LoginContext";

export const MessageContext = createContext();


const MessageContextProvider = ({ children }) => {
    const activeUser = useContext(LoginContext);

    const INITIAL_STATE = {
        chatid: "null",
        user: {},
    }

    const messageReducer = (state, action) => {
        switch (action.type) {
            case "CHANGE_USER":
                return {
                    chatid: activeUser.uid > action.payload.uid ? activeUser.uid + action.payload.uid : action.payload.uid + activeUser.uid,
                    user: action.payload,
                };
            default:
                return state;
        }
    };

    const [state, dispatch] = useReducer(messageReducer, INITIAL_STATE);


    return (
        <MessageContext.Provider value={{ content: state, dispatch }}>
            {children}
        </MessageContext.Provider>
    );
}

export default MessageContextProvider;