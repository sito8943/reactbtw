/* eslint-disable react/function-component-definition */
/* eslint-disable react/jsx-no-constructed-context-values */
import * as React from "react";

// prop-types is a library for typechecking of props
import PropTypes from "prop-types";

const CreationAnimation = React.createContext();

const creationAnimationReducer = (creationAnimationState, action) => {
  switch (action.type) {
    case "active":
      return {
        ...creationAnimationState,
        active: action.active,
      };
    case "set":
      return {
        ...creationAnimationState,
        appearDone: action.to,
      };
    default:
      throw new Error(`Unhandled action type: ${action.type}`);
  }
};

const CreationAnimationProvider = ({ children }) => {
  const [creationAnimationState, setCreationAnimationState] = React.useReducer(
    creationAnimationReducer,
    {
      active: 0,
      appearDone: false,
    }
  );

  const value = { creationAnimationState, setCreationAnimationState };
  return (
    <CreationAnimation.Provider value={value}>
      {children}
    </CreationAnimation.Provider>
  );
};

CreationAnimationProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

// hooks
const useCreationAnimation = () => {
  const context = React.useContext(CreationAnimation);
  if (context === undefined)
    throw new Error("creationAnimationContext must be used within a Provider");
  return context;
};

export { CreationAnimationProvider, useCreationAnimation };
