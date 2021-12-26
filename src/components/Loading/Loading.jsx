import React, { useEffect, useState } from "react";
import { Spinner, SpinnerSize } from '@fluentui/react/lib/Spinner';
import { motion } from "framer-motion";

// images
import compass from "../../img/compass.svg";

// styles
import "./style.scss";

const Loading = (props) => {
  const { type, visible } = props;
  const [ state, setState ] = useState(visible);
  const [ hide, setHide ] = useState(false);

  useEffect(() => {
    if (!state)
      setTimeout(() => {

      }, 200)
  }, [state]);

  return (
    <>
      {!hide ? (
        <motion.div animate={{ opacity: visible ? 1 : 0 }} className={type ? type : ""}>
          {type === "big" ? ( 
            <div id='loadingScreen' className='loading_container'>
              <img id='loading' src={compass} alt="compass" />
            </div>
          ) : (
            <Spinner id="loading" size={SpinnerSize.large} />
          )}
        </motion.div>
      ) : (
        <></>
      )}
    </>
    
  );
};

export default Loading;
