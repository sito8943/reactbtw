// @ts-check
// eslint-disable-next-line no-unused-vars
import Character from "../models/Character";

/**
 *
 * @param {Character} unit
 * @param {string} animation
 */
export const removeAnimation = (unit, animation) => {
  let extraAnimation = unit.GetAttribute("extraAnimation");
  if (extraAnimation) {
    extraAnimation = extraAnimation.replace(animation, "");
    unit.SetAttribute("extraAnimation", extraAnimation);
  }
};

/**
 *
 * @param {Character} unit
 * @param {string} animation
 */
export const addAnimation = (unit, animation) => {
  const extraAnimation = unit.GetAttribute("extraAnimation");
  if (extraAnimation && extraAnimation.indexOf(animation) === -1)
    unit.SetAttribute("extraAnimation", `${extraAnimation} ${animation}`);
  else unit.SetAttribute("extraAnimation", animation);
};

/**
 * @param {string} animation
 */
export const getAnimation = (animation) => {
  switch (animation) {
    default:
      return {
        rotate: 0,
        scale: 1,
      };
  }
};

/**
 *
 * @param {string} animation
 * @returns
 */
export const getTransition = (animation) => {
  switch (animation) {
    default:
      return {
        type: "spring",
        stiffness: 260,
        damping: 20,
      };
  }
};

/**
 * @param {string} animation
 */
export const getInitial = (animation) => {
  switch (animation) {
    default:
      return { scale: 0 };
  }
};
