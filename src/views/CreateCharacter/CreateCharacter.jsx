import { useEffect } from "react";

// tippy
import Tippy from "@tippyjs/react";
import "tippy.js/dist/tippy.css"; // optional

// @emotion/css
import { css } from "@emotion/css";

// own components
import Container from "../../components/Container/Container";
import CharacterPortrait from "../../components/CharacterPortrait/CharacterPortrait";

// context
import { useLanguage } from "../../context/Language";
import { useContext } from "../../context/ContextProvider";
import { useCreationAnimation } from "../../context/CreationAnimation";
import { useAudioController } from "../../context/AudioController";
import { useAudioConfig } from "../../context/AudioConfig";

const CreateCharacter = () => {
  const { languageState } = useLanguage();
  const { contextState } = useContext();
  const { audioConfigState } = useAudioConfig();
  const { setAudioControllerState } = useAudioController();
  const { creationAnimationState, setCreationAnimationState } =
    useCreationAnimation();

  const playSound = (sound) => {
    if (audioConfigState.sfx) setAudioControllerState({ type: sound });
  };

  const playMusic = (sound) => {
    if (audioConfigState.bfx) setAudioControllerState({ type: sound });
  };

  useEffect(() => {
    const time = setTimeout(() => {
      setCreationAnimationState({ type: "set", to: true });
    }, 5000);
    document.body.onkeydown = () => {
      clearTimeout(time);
      setCreationAnimationState({ type: "set", to: true });
    };
    playMusic("creation");
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

  const disabled = css({
    cursor: "initial",
    background: "#111111 !important",
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
      <CharacterPortrait edit />
      <Container
        sx={{
          position: "absolute",
          bottom: "0",
          left: "0",
          transition: "all 400ms ease",
          transform:
            creationAnimationState.appearDone &&
            creationAnimationState.active !== 3
              ? "translateY(0)"
              : "translateY(60px)",
        }}
      >
        <button
          onClick={() => {
            playSound("normal-click");
            setCreationAnimationState({ type: "active", active: 0 });
          }}
          className={`${skewButton} ${
            creationAnimationState.active === 0 ? activeCss : ""
          }`}
        >
          <span>{languageState.texts.Creation.Buttons.General}</span>
        </button>
        <button
          onClick={() => {
            playSound("normal-click");
            setCreationAnimationState({ type: "active", active: 1 });
          }}
          className={`${skewButton} ${
            creationAnimationState.active === 1 ? activeCss : ""
          }`}
        >
          <span>{languageState.texts.Creation.Buttons.Appearance}</span>
        </button>
        <button
          onClick={() => {
            playSound("normal-click");
            setCreationAnimationState({ type: "active", active: 2 });
          }}
          className={`${skewButton} ${
            creationAnimationState.active === 2 ? activeCss : ""
          }`}
        >
          <span>{languageState.texts.Creation.Buttons.Class}</span>
        </button>
        {contextState.character.Name === "" ||
        contextState.character.Name.length < 4 ? (
          <Tippy content={languageState.texts.Creation.Tooltips.NotYet}>
            <button
              onClick={
                contextState.character.Name === "" ||
                contextState.character.Name.length
                  ? null
                  : () => {
                      playSound("normal-click");
                      setCreationAnimationState({ type: "active", active: 3 });
                    }
              }
              className={`${skewButton} ${disabled}`}
              style={{ borderRadius: "0 5px 0 0" }}
            >
              <span>{languageState.texts.Creation.Buttons.Finish}</span>
            </button>
          </Tippy>
        ) : (
          <button
            onClick={() => {
              playSound("normal-click");
              setCreationAnimationState({ type: "active", active: 3 });
            }}
            className={skewButton}
            style={{ borderRadius: "0 5px 0 0" }}
          >
            <span>{languageState.texts.Creation.Buttons.Finish}</span>
          </button>
        )}
      </Container>
    </Container>
  );
};

export default CreateCharacter;
