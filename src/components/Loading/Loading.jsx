import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";

// images
import compass from "../../img/compass.svg";

// styles
import "./style.css";

const Loading = (props) => {
  const { type, visible } = props;
  const [hide, setHide] = useState(false);

  const init = () => {
    if (visible)
      setTimeout(() => {
        setHide(true);
      }, 200);
  }

  useEffect(() => {
    init();
  }, []);

  return (
    <>
      {!hide ? (
        <motion.div animate={{ opacity: visible ? 1 : 0 }}>
          <div className={type ? type : ""}>
            <img id="loading" src={compass} alt="compass" />
          </div>
        </motion.div>
      ) : (
        <></>
      )}
    </>
  );
};

export default Loading;
