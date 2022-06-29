// @ts-check
// eslint-disable-next-line no-unused-vars
import Character from "../models/Character";
import { AllActions } from "../models/Action";

// errors
export const Errors = {
  InvalidTarget: "InvalidTarget",
};

/**
 *
 * @param {HTMLElement} domElement
 * @returns first parent with id different from "", "name-row" and contains "-"
 */
export const parseNodeUnit = (domElement) => {
  let node = domElement;
  while (
    node.id === "" ||
    node.id === "name-row" ||
    node.id.indexOf("-") === -1
  )
    // @ts-ignore
    node = node.parentNode;
  return node;
};

/**
 *
 * @param {string} targetType
 * @returns true if the targetType is for a team, false otherwise
 */
const isJustATeam = (targetType) => {
  return targetType === "enemy" || targetType === "player";
};

/**
 *
 * @param {string} team
 * @param {Character} unit
 * @param {string} action
 * @returns
 */
export const validTarget = (team, unit, action) => {
  if (
    AllActions[action].affect !== team &&
    isJustATeam(AllActions[action].affect)
  )
    return { error: Errors.InvalidTarget };
  return true;
};
