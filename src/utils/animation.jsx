/**
 * @param {string} animation
 */
export const getAnimation = (animation) => {
  switch (animation) {
    default:
      return { 
        rotate: 0, 
        scale: 1 
      };
  }
}

export const getTransition = (animation) => {
  switch (animation) {
    default:
      return {
        type: "spring",
        stiffness: 260,
        damping: 20
      };
  }
}

/**
 * @param {string} animation
 */
export const getInitial = (animation) => {
  switch (animation) {
    default:
      return { scale: 0 };
  }
}