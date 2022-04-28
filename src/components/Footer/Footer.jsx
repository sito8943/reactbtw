import React from "react";

// @emotion/css
import { css } from "@emotion/css";

// react-router-dom
import { Link } from "react-router-dom";

// own components
import Container from "../Container/Container";

// contexts
import { useLanguage } from "../../context/Language";

const Footer = () => {
  const { languageState } = useLanguage();

  const footer = css({
    position: "absolute",
    height: "30px",
    width: "100vw",
    bottom: 0,
    background: "#222333",
  });

  const footerLink = css({
    margin: "0 25px",
    color: "#aeb4b9",
    "&:hover": {
      color: "dodgerblue",
    },
  });

  return (
    <Container
      alignItems="center"
      justifyContent="center"
      className={`${footer}`}
    >
      <Link className={footerLink} to="https://discord.com">
        {languageState.texts.Footer.Community}
      </Link>
      <Link className={footerLink} to="https://btw.com">
        Beyond the World
      </Link>
      <Link className={footerLink} to="https://btw/support.com">
        {languageState.texts.Footer.Support}
      </Link>
    </Container>
  );
};

export default Footer;
