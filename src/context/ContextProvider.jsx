import { base64encode } from "nodejs-base64";
import * as React from "react";
import User from "../models/User";

const Context = React.createContext();

const contextReducer = (contextState, action) => {
  switch (action.type) {
    case "change-user-action": {
      return {
        id: contextState.id,
        name: contextState.name,
        photo: contextState.photo,
        level: action.level,
        action: contextState.checking,
        lang: contextState.lang,
        mode: contextState.mode,
        netStatus: contextState.netStatus,
        showingNotification: contextState.showingNotification,
      }
    }
    case "changeLanguage": {
      return {
        id: contextState.id,
        name: contextState.name,
        photo: contextState.photo,
        level: contextState.level,
        action: contextState.checking,
        lang: action.newLang,
        mode: contextState.mode,
        netStatus: contextState.netStatus,
        showingNotification: contextState.showingNotification,
      };
    }
    case "changeMode":
      return {
        id: contextState.id,
        name: contextState.name,
        photo: contextState.photo,
        level: contextState.level,
        action: contextState.checking,
        lang: contextState.lang,
        mode: action.mode,
        netStatus: contextState.netStatus,
        showingNotification: contextState.showingNotification,
      };
    case "showing":
      return {
        id: contextState.id,
        name: contextState.name,
        photo: contextState.photo,
        level: contextState.level,
        action: contextState.checking,
        lang: contextState.lang,
        mode: contextState.mode,
        netStatus: contextState.netStatus,
        showingNotification: true,
      };
    case "offline":
      return {
        id: contextState.id,
        name: contextState.name,
        photo: contextState.photo,
        level: contextState.level,
        action: contextState.checking,
        lang: contextState.lang,
        netStatus: 0,
        mode: contextState.mode,
        showingNotification: contextState.showingNotification,
      };
    case "online":
      return {
        id: contextState.id,
        name: contextState.name,
        photo: contextState.photo,
        level: contextState.level,
        action: contextState.checking,
        lang: contextState.lang,
        netStatus: 1,
        mode: contextState.mode,
        showingNotification: contextState.showingNotification,
      };
    case "checking":
      return {
        id: contextState.id,
        name: contextState.name,
        photo: contextState.photo,
        level: contextState.level,
        action: contextState.checking,
        lang: contextState.lang,
        mode: contextState.mode,
        netStatus: 2,
        showingNotification: false,
      };
    case "log-in":
      return {
        id: action.id,
        name: action.name,
        photo: action.photo,
        level: action.level,
        action: 0,
        lang: action.lang,
        mode: contextState.mode,
        netStatus: contextState.netStatus,
        showingNotification: contextState.showingNotification,
      };
    case "log-off":
      return {
        id: 0,
        name: "",
        photo: undefined,
        level: 0,
        action: 0,
        lang: contextState.lang,
        mode: contextState.mode,
        netStatus: contextState.netStatus,
        showingNotification: contextState.showingNotification,
      };
    default:
      throw new Error(`Unhandled action type: ${action.type}`);
  }
};

const ContextProvider = ({ children }) => {
  const [contextState, setContextState] = React.useReducer(contextReducer, {
    id: 1,
    name: "Sito",
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
