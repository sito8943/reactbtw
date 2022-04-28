import * as React from "react";
import { ClassEnumType } from "../models/Classes";

const Context = React.createContext();

const contextReducer = (contextState, action) => {
  switch (action.type) {
    case "change-user-action": {
      return {
        ...contextState,
        level: action.level,
      };
    }
    case "changeLanguage": {
      return {
        ...contextState,
        lang: action.newLang,
      };
    }
    case "changeMode":
      return {
        ...contextState,
        mode: action.mode,
      };
    case "showing":
      return {
        ...contextState,
        showingNotification: true,
      };
    case "offline":
      return {
        ...contextState,
        netStatus: 0,
      };
    case "online":
      return {
        ...contextState,
        netStatus: 1,
      };
    case "checking":
      return {
        ...contextState,
        netStatus: 2,
        showingNotification: false,
      };
    case "log-in":
      return {
        ...contextState,
        action: 0,
        lang: action.data.lang,
      };
    case "log-off":
      return {
        ...contextState,
        id: 0,
        name: "",
        photo: undefined,
        level: 0,
        action: 0,
      };
    default:
      throw new Error(`Unhandled action type: ${action.type}`);
  }
};

const ContextProvider = ({ children }) => {
  const [contextState, setContextState] = React.useReducer(contextReducer, {
    id: 1,
    name: "Sito",
    class: ClassEnumType.Hunter,
    photo: undefined,
    level: 0,
    action: 0,
    lang: "ES",
    netStatus: "",
    mode: "dark",
    showingNotification: false,
  });

  const value = { contextState, setContextState };
  return <Context.Provider value={value}>{children}</Context.Provider>;
};

//hooks
const useContext = () => {
  const context = React.useContext(Context);
  if (context === undefined)
    throw new Error("useContext must be used within a Provider");
  return context;
};

export { ContextProvider, useContext };
