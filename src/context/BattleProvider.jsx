/* eslint-disable react/function-component-definition */
/* eslint-disable react/jsx-no-constructed-context-values */
import * as React from "react";

// prop-types is a library for typechecking of props
import PropTypes from "prop-types";

const BattleContext = React.createContext();

const battleReducer = (battleState, action) => {
  switch (action.type) {
    case "set":
      return {};
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
