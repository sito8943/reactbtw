import { useState, useEffect } from "react";

// @emotion/css
import { css } from "@emotion/css";

// own components
import Container from "../../components/Container/Container";
import CharacterPortrait from "../../components/CharacterPortrait/CharacterPortrait";

// context
import { useLanguage } from "../../context/Language";
import { useContext } from "../../context/ContextProvider";
import { useCreationAnimation } from "../../context/CreationAnimation";

const CreateCharacter = () => {
  const [name, setName] = useState("");

  const { languageState } = useLanguage();
  const { contextState } = useContext();
  const { creationAnimationState, setCreationAnimationState } =
    useCreationAnimation();

  const handleName = (newName) => setName(name);

  useEffect(() => {
    const time = setTimeout(() => {
      setCreationAnimationState({ type: "set", to: true });
    }, 5000);
    document.body.onkeydown = () => {
      clearTimeout(time);
      setCreationAnimationState({ type: "set", to: true });
    };
    return () => {
      document.body.onkeydown = null;
    };
  }, []);

  const skewButton = css({
    background: "#222222",
    border: "1px solid #383838",
    transition: "all 400ms ease",
    "&:hover": {
      background: "#383838",
    },
    color: "aliceblue",
    padding: "5px 20px",
    width: "150px",
  });

  const activeCss = css({
    background: "#383838 !important",
  });

  return (
    <Container
      justifyContent="center"
      alignItems="center"
      sx={{
        width: "100vw",
        height: "100vh",
      }}
    >
      <CharacterPortrait edit changeName={handleName} />
      <Container
        sx={{
          position: "absolute",
          bottom: "0",
          left: "0",
          transition: "all 400ms ease",
          transform: creationAnimationState.appearDone
            ? "translateY(0)"
            : "translateY(60px)",
        }}
      >
        <button
          onClick={() =>
            setCreationAnimationState({ type: "active", active: 0 })
          }
          className={`${skewButton} ${
            creationAnimationState.active === 0 ? activeCss : ""
          }`}
        >
          <span>{languageState.texts.Creation.Buttons.General}</span>
        </button>
        <button
          onClick={() =>
            setCreationAnimationState({ type: "active", active: 1 })
          }
          className={`${skewButton} ${
            creationAnimationState.active === 1 ? activeCss : ""
          }`}
        >
          <span>{languageState.texts.Creation.Buttons.Appearance}</span>
        </button>
        <button
          onClick={() =>
            setCreationAnimationState({ type: "active", active: 2 })
          }
          className={`${skewButton} ${
            creationAnimationState.active === 2 ? activeCss : ""
          }`}
          style={{ borderRadius: "0 5px 0 0" }}
        >
          <span>{languageState.texts.Creation.Buttons.Class}</span>
        </button>
      </Container>
    </Container>
  );
};

export default CreateCharacter;
