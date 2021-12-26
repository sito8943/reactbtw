import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";

// 3rd libs
import Loader from "react-loader-spinner";

// images
import compass from "../../img/compass.svg";

// styles
import "./style.scss";

const Loading = (props) => {
  const { type, visible } = props;
  const [state, setState] = useState(visible);
  const [hide, setHide] = useState(false);

  useEffect(() => {
    if (!state) setTimeout(() => {}, 200);
  }, [state]);

  return (
    <>
      {!hide ? (
        <motion.div
          animate={{ opacity: visible ? 1 : 0 }}
          className={type ? type : ""}
        >
          {type === "big" ? (
            <div id="loadingScreen" className="loading_container">
              <img id="loading" src={compass} alt="compass" />
            </div>
          ) : (
            <Loader
              type="circles"
              color="#1d1d1d"
              height={100}
              width={100}
              timeout={0} //3 secs
            />
          )}
        </motion.div>
      ) : (
        <></>
      )}
    </>
  );
};

export default Loading;
