import React, { useState, useEffect } from "react";

// react-router-dom
import { Link } from "react-router-dom";

// images
import main from "../../img/bg/main.jpg";

// context
import { useContext } from "../../context/ContextProvider";
import { useGraphicConfig } from "../../context/GraphicConfig";

// utils

// models
import User from "../../models/User";

// components
import Loading from "../../components/Loading/Loading";
import ShootingStars from "../../components/ShootingStars/ShootingStars";

const Home = (props) => {
  const { texts } = props;
  const { contextState, setContextState } = useContext();
  const { graphicConfigState, setGraphicConfigState } = useGraphicConfig();
  const [loading, setLoading] = useState(true);

  const init = () => {};

  useEffect(() => {
    init();
    setLoading(false);
  }, []);

  return <div className="view"></div>;
};

export default Home;
