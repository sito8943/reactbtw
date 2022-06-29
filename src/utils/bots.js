// @ts-check
// eslint-disable-next-line no-unused-vars
import Character from "../models/Character";

/**
 *
 * @param {Character} unit
 * @returns true is unit is a bot, false otherwise
 */
export const isABot = (unit) => unit.GetAttribute("bot");
