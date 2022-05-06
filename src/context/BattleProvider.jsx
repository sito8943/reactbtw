/* eslint-disable react/function-component-definition */
/* eslint-disable react/jsx-no-constructed-context-values */
import * as React from "react";

// models
import { EventsTypeEnum } from "../models/Field";

// prop-types is a library for typechecking of props
import PropTypes from "prop-types";

const BattleContext = React.createContext();

const battleReducer = (battleState, action) => {
  switch (action.type) {
    case "check":
      return {
        ...battleState,
        checking: battleState.checking,
      };
    case "read":
      return {
        ...battleState,
        notifications: action.read,
      };
    case "init":
      return {
        field: action.field,
        goodTeam: action.goodTeam,
        evilTeam: action.evilTeam,
        notifications: [{ label: action.type, type: EventsTypeEnum.World }],
      };
    default:
      throw new Error(`Unhandled action type: ${action.type}`);
  }
};

const BattleProvider = ({ children }) => {
  const [battleState, setBattleState] = React.useReducer(battleReducer, {});

  const value = { battleState, setBattleState };
  return (
    <BattleContext.Provider value={value}>{children}</BattleContext.Provider>
  );
};

BattleProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

// hooks
const useBattle = () => {
  const context = React.useContext(BattleContext);
  if (context === undefined)
    throw new Error("battleContext must be used within a Provider");
  return context;
};

export { BattleProvider, useBattle };
