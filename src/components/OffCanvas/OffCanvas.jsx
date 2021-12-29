import React from "react";
import { motion } from "framer-motion";

// utils
import { getInitial, getAnimation, getTransition } from "../../utils/animation";

// style
import "./style.scss";

const OffCanvas = (props) => {
	const {visible, children, className, id, name, style} = props;

	return <motion.div animate={{left: !visible ? "-250px" : 0}} className={`off-canvas ${className}`} style={style} id={id} name={name}>
		{children}
	</motion.div>
}

OffCanvas.defaultName = "OffCanvas";

OffCanvas.defaultProps = {
	visible: false,
	className: "",
	id: "",
	name: "",
	style: {},
}

export default OffCanvas;