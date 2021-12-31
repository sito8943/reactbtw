import React from "react";
import { motion } from "framer-motion";
import { MdSettings, MdMenu, MdMenuOpen } from "react-icons/md";

// 3rd lib
import { MdClose } from "react-icons/md";

// utils
import { getInitial, getAnimation, getTransition } from "../../utils/animation";

// style
import "./style.scss";

const OffCanvas = (props) => {
	const {visible, children, className, id, name, style, onClick} = props;

	return <motion.div animate={{left: !visible ? "-250px" : 0}} className={`off-canvas ${className}`} style={style} id={id} name={name}>
		<div className="close-button-row flex justify-right full-width">
			<button onClick={onClick}>
				<MdClose />
			</button>
		</div>
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