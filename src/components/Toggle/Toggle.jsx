import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";

import "./style.scss";

const Toggle = (props) => {
  const { className, id, value, offRender, onRender, onToggle } = props;
  const [toggle, setToggle] = useState(false);

  useEffect(() => {
    setToggle(value);
  });

  return (
    <div className={`toggle ${className}`} id={id} onClick={onToggle}>
      <div className={`toggle-background ${toggle ? "checked" : "unchecked"}`}>
        <motion.div
          animate={{ opacity: toggle ? 1 : 0 }}
          className="toggle-right-content"
        >
          {onRender}
        </motion.div>
        <motion.div
          animate={{ opacity: !toggle ? 1 : 0 }}
          className="toggle-left-content"
        >
          {offRender}
        </motion.div>
      </div>
      <div className="toggle-switcher">
        <div
          className={`toggle-ball-${toggle ? "checked" : "unchecked"}`}
        ></div>
        <input className="toggle-check" type="checkbox" value={toggle} />
      </div>
    </div>
  );
};

export default Toggle;
