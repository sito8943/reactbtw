import React from "react";
import { Spinner, SpinnerSize } from '@fluentui/react/lib/Spinner';
import { motion } from "framer-motion";

// styles
import "./style.scss";

const ShootingStars = (props) => {
  const { type, visible } = props;
  return (
    <section id='shooting-stars'>
      <span></span>
      <span></span>
      <span></span>
      <span></span>
      <span></span>
    </section>
  );
};

export default ShootingStars;
