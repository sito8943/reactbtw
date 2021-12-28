import React from "react";
import { Link } from "react-router-dom";

// styles
import "./style.scss";

const Footer = (props) => {
  const { texts } = props;

  return (
    <div className="footer flex justify-center align-center">
      <Link to="https://discord.com">
        {texts.Comunity}
      </Link>
      <Link to="https://btw.com">
        Beyond the World
      </Link>
      <Link to="https://btw/support.com">
        {texts.Support}
      </Link>
    </div>
  );
};

export default Footer;
