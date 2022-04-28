// prop-types
import PropTypes from "prop-types";

// framer-motion
import { motion } from "framer-motion";

// @emotion/css
import { css } from "@emotion/css";

// react-icons
import { MdClose } from "react-icons/md";

// style
import "./style.css";

const OffCanvas = (props) => {
  const { visible, children, className, id, name, style, onClick } = props;

  return (
    <motion.div
      animate={{ left: !visible ? "-250px" : 0 }}
      className={`off-canvas ${className}`}
      style={style}
      id={id}
      name={name}
    >
      <div className="close-button-row flex justify-right full-width">
        <button onClick={onClick}>
          <MdClose />
        </button>
      </div>
      {children}
    </motion.div>
  );
};

OffCanvas.defaultName = "OffCanvas";

OffCanvas.defaultProps = {
  visible: false,
  className: "",
  id: "",
  name: "",
  style: {},
};

OffCanvas.propTypes = {
  visible: PropTypes.bool,
  className: "",
  id: "",
  name: "",
  style: {},
};

export default OffCanvas;
