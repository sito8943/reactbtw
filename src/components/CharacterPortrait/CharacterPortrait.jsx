import { useEffect, useState } from "react";

// tippy
import Tippy from "@tippyjs/react";
import "tippy.js/dist/tippy.css"; // optional

// @emotion/css
import { css } from "@emotion/css";

// models
import { AttributeIcons, ClassIcons } from "../../assets/icons/icons";

// contexts
import { useReward } from "react-rewards";
import { useContext } from "../../context/ContextProvider";
import { useLanguage } from "../../context/Language";
import { useCreationAnimation } from "../../context/CreationAnimation";

// images
import femaleHighElf from "../../img/portrait/femalehighelf.webp";

// icons
import { MdAddCircle } from "react-icons/md";

// own components
import Container from "../Container/Container";

// styles
import "./style.css";

const CharacterPortrait = (props) => {
  const { id, name, style, edit, changeName } = props;

  const { languageState } = useLanguage();
  const { contextState, setContextState } = useContext();
  const { creationAnimationState, setCreationAnimationState } =
    useCreationAnimation();
  const { reward, isAnimating } = useReward("rewardId", "confetti");

  // see more states for animation
  const [seeMore, setSeeMore] = useState(false);
  const [portraitAnimation, setPortraitAnimation] = useState(false);
  const [seeMoreAnimation, setSeeMoreAnimation] = useState(false);
  const [attributesAnimation, setAttributesAnimation] = useState(false);

  // normal stats states for animation
  const [changeAttributes, setChangeAttributes] = useState(false);
  const [localActive, setLocalActive] = useState(0);

  useEffect(() => {
    if (creationAnimationState.active !== localActive)
      if (!seeMore) toggleSeeMore();
    setChangeAttributes(true);
    setTimeout(() => {
      setLocalActive(creationAnimationState.active);
      setTimeout(() => {
        setChangeAttributes(false);
      }, 400);
    }, 400);
    if (creationAnimationState.active === 1) {
    }
  }, [creationAnimationState.active]);

  const [characterName, setCharacterName] = useState("");

  useEffect(() => {
    changeName(characterName);
  }, [characterName]);

  const [nameFocus, setNameFocus] = useState(false);

  const characterPortrait = {
    padding: "10px",
    background: "#222222",
    border: "1px solid #383838",
    borderRadius: !portraitAnimation ? "1rem" : "1rem 0 0 1rem",
    width: "200px",
    height: "300px",
    zIndex: 1,
    h3: {
      color: "#aeb4b9",
    },
    color: "#5e6264",
    transform: !portraitAnimation ? "translateX(0)" : "translateX(-20px)",
    transition: "all 400ms ease",
  };

  const portraitRow = {
    marginTop: "10px",
    alignItems: "center",
    transition: "all 400ms ease",
  };

  const spaceAround = {
    justifyContent: "space-around",
  };

  const bigFont = {
    fontSize: "20px",
  };

  const label = css({
    marginRight: "10px",
    fontWeight: "500",
  });

  const imageContainer = css({
    borderRadius: "100%",
    backgroundColor: "#22244e",
    img: {
      width: "130px",
    },
    zIndex: 1,
  });

  const characterClass = css({
    fontSize: "12rem",
    position: "absolute",
    opacity: 0.1,
  });

  const moreButton = css({
    border: 0,
    background: "none",
    color: "aliceblue",
    fontSize: "25px",
    transition: "all 400ms ease",
    "&:hover": {
      color: "gray",
    },
  });

  const attributes = {
    opacity: 1,
    padding: "10px",
    border: "1px solid #383838",
    borderRadius: "0 1rem 1rem 0",
    background: "#222222eb",
    width: portraitAnimation ? "400px" : "0",
    height: "300px",
    transition: "all 1000ms ease",
    marginLeft: "-20px",
    paddingLeft: portraitAnimation ? "20px" : 0,
    overflow: "auto",
    color: "#797e81",
  };

  const input = css({
    background: "#333333",
    borderRadius: "10px",
    border: "none",
    padding: "5px",
    resize: "none",
    color: "#5e6264",
    width: "100px",
    transition: "all 400ms ease",
  });

  const classButton = css({
    border: "1px solid #383838",
    background: "#222222eb",
    color: "#5e6264",
    transition: "all 400ms ease",
    padding: "5px 5px 5px 5px",
    borderRadius: "5px",
    height: "25px",
    margin: "5px",
    "&:hover": {
      background: "#383838",
    },
  });

  const active = css({
    background: "#383838 !important",
  });

  const description = css({
    background: "#292929",
    borderRadius: "15px",
    border: "none",
    padding: "20px",
    minHeight: "150px",
    resize: "none",
    lineHeight: "20px",
    color: "#5e6264",
    marginBottom: "1em",
  });

  useEffect(() => {
    if (creationAnimationState.appearDone && edit) {
      document.getElementById("click").click();
      setTimeout(() => {
        toggleSeeMore();
      }, 1000);
    }
  }, [creationAnimationState.appearDone]);

  useEffect(() => {
    console.log(contextState.character.Attack);
  }, [contextState]);

  const toggleSeeMore = async () => {
    if (seeMore) {
      setAttributesAnimation(false);
      setTimeout(() => {
        setPortraitAnimation(false);
        setSeeMoreAnimation(!seeMoreAnimation);
        setTimeout(() => {
          setSeeMore(!seeMore);
        }, 1000);
      }, 400);
    } else {
      setSeeMore(true);
      setTimeout(() => {
        setPortraitAnimation(true);
        setTimeout(() => {
          setSeeMoreAnimation(!seeMoreAnimation);
          setTimeout(() => {
            setAttributesAnimation(true);
          }, 200);
        }, 1000);
      }, 5);
    }
  };

  return (
    <>
      <Container
        className="scale-div"
        flexDirection="column"
        alignItems="left"
        justifyContent="center"
      >
        <Container>
          <Container
            flexDirection="column"
            alignItems="center"
            justifyContent="space-around"
            sx={characterPortrait}
            id={id}
            name={name}
            style={style}
            className={creationAnimationState.appearDone ? "" : "rotate-card"}
          >
            <Container
              sx={{
                width: "100%",
                zIndex: 2,
                justifyContent: "end",
                marginBottom: "-50px",
                marginTop: "-15px",
              }}
            >
              <button
                className={moreButton}
                onClick={toggleSeeMore}
                disabled={creationAnimationState.appearDone ? false : true}
              >
                <MdAddCircle
                  style={{
                    opacity: creationAnimationState.appearDone ? 1 : 0,
                    transition: "all 400ms ease",
                    transform: seeMore ? "rotateZ(45deg)" : "rotateX(0deg)",
                  }}
                />
              </button>
            </Container>
            <span className={characterClass}>
              {ClassIcons[contextState.character.Class]}
            </span>
            <Container
              extraProps={{
                onClick: () =>
                  setCreationAnimationState({ type: "active", active: 1 }),
              }}
              sx={{ cursor: "pointer", transition: "all 400ms ease" }}
              className={imageContainer}
            >
              <img
                src={
                  contextState.photo ? contextState.user.photo : femaleHighElf
                }
                style={{ transition: "all 400ms ease" }}
                alt="character-portrait"
              />
            </Container>
            <Container
              sx={{ zIndex: 1, width: "185px" }}
              flexDirection="column"
            >
              <Container
                sx={{
                  ...portraitRow,
                  opacity: localActive !== 2 && !changeAttributes ? 1 : 0,
                }}
                id="name-row"
              >
                <span className={label}>
                  {languageState.texts.CharacterPortrait.Labels.Name}{" "}
                </span>
                {edit ? (
                  <input
                    onFocus={() => setNameFocus(true)}
                    onBlur={
                      characterName.length === 0
                        ? () => setNameFocus(false)
                        : null
                    }
                    style={{
                      height: !nameFocus ? 0 : "15px",
                      marginTop: nameFocus ? 0 : "4px",
                    }}
                    className={input}
                    value={characterName}
                    onChange={(e) => setCharacterName(e.target.value)}
                  />
                ) : (
                  <span>{contextState.character.Name}</span>
                )}
              </Container>
              <Container
                sx={{
                  ...portraitRow,
                  display: localActive === 2 ? "flex" : "none",
                  opacity: !changeAttributes ? 1 : 0,
                }}
                id="class-row"
              >
                <span className={label}>
                  {languageState.texts.CharacterPortrait.Labels.Class}{" "}
                </span>
                <Container sx={{ marginTop: "5px" }} alignItems="center">
                  {ClassIcons.map((item, i) => (
                    <Tippy
                      key={i}
                      content={languageState.texts.CharacterPortrait.Classes[i]}
                    >
                      <button
                        className={`${classButton} ${
                          contextState.character.class === i ? active : ""
                        }`}
                        onClick={() =>
                          setContextState({
                            type: "set",
                            which: "class",
                            to: i,
                          })
                        }
                      >
                        {item}
                      </button>
                    </Tippy>
                  ))}
                </Container>
              </Container>
              <Container
                sx={{
                  ...portraitRow,
                  opacity: localActive !== 2 && !changeAttributes ? 1 : 0,
                }}
                id="level-row"
              >
                <span className={label}>
                  {languageState.texts.CharacterPortrait.Labels.Level}{" "}
                </span>
                <span>{contextState.character.Level}</span>
              </Container>
              <Container
                sx={{
                  ...portraitRow,
                  display: localActive !== 2 ? "flex" : "none",
                  opacity: !changeAttributes ? 1 : 0,
                }}
                id="range-row"
              >
                <span className={label}>
                  {languageState.texts.CharacterPortrait.Labels.Range}{" "}
                </span>
                <span>
                  {
                    languageState.texts.CharacterPortrait.Range[
                      contextState.character.Level
                    ]
                  }
                </span>
              </Container>
            </Container>
          </Container>
          {seeMore && (
            <Container sx={attributes}>
              <Container
                flexDirection="column"
                className="scroll"
                sx={{
                  overflow: "auto",
                  padding: "0 20px",
                  width: "100%",
                  display: !seeMoreAnimation ? "none" : "flex",
                  opacity: attributesAnimation ? 1 : 0,
                  transition: "all 400ms ease",
                }}
              >
                <>
                  <h3>
                    {languageState.texts.CharacterPortrait.Labels.Attributes}
                  </h3>
                  <Container>
                    <Container flexDirection="column">
                      <Container
                        sx={{ ...portraitRow, ...bigFont, ...spaceAround }}
                        id="attack-row"
                      >
                        <span style={{ marginRight: "20px" }} className={label}>
                          {AttributeIcons.attack}
                        </span>
                        <Container sx={{ marginBottom: "2px" }}>
                          <Tippy
                            content={
                              seeMoreAnimation
                                ? languageState.texts.CharacterPortrait.Tooltips
                                    .Attack
                                : ""
                            }
                          >
                            <span className={label}>
                              {
                                languageState.texts.CharacterPortrait.Labels
                                  .Attack
                              }{" "}
                            </span>
                          </Tippy>
                          <span>{contextState.character.Attack.max}</span>
                        </Container>
                      </Container>
                      <Container
                        sx={{ ...portraitRow, ...bigFont, ...spaceAround }}
                        id="armor-row"
                      >
                        <span className={label}>{AttributeIcons.armor}</span>
                        <Container sx={{ marginBottom: "2px" }}>
                          <Tippy
                            content={
                              seeMoreAnimation
                                ? languageState.texts.CharacterPortrait.Tooltips
                                    .Armor
                                : ""
                            }
                          >
                            <span className={label}>
                              {
                                languageState.texts.CharacterPortrait.Labels
                                  .Armor
                              }{" "}
                            </span>
                          </Tippy>

                          <span>{contextState.character.Armor.max}</span>
                        </Container>
                      </Container>
                      <Container
                        sx={{ ...portraitRow, ...bigFont }}
                        id="luck-row"
                      >
                        <span style={{ marginRight: "20px" }}>
                          {AttributeIcons.luck}
                        </span>
                        <Container sx={{ marginBottom: "2px" }}>
                          <Tippy
                            content={
                              seeMoreAnimation
                                ? languageState.texts.CharacterPortrait.Tooltips
                                    .Luck
                                : ""
                            }
                          >
                            <span className={label}>
                              {
                                languageState.texts.CharacterPortrait.Labels
                                  .Luck
                              }{" "}
                            </span>
                          </Tippy>

                          <span>{contextState.character.Luck.max}</span>
                        </Container>
                      </Container>
                    </Container>

                    <Container
                      flexDirection="column"
                      sx={{ marginLeft: "20px" }}
                    >
                      <Container
                        sx={{ ...portraitRow, ...bigFont, ...spaceAround }}
                        id="life-row"
                      >
                        <span style={{ marginRight: "20px" }}>
                          {AttributeIcons.life}
                        </span>
                        <Container sx={{ marginBottom: "2px" }}>
                          <Tippy
                            content={
                              seeMoreAnimation
                                ? languageState.texts.CharacterPortrait.Tooltips
                                    .Life
                                : ""
                            }
                          >
                            <span className={label}>
                              {
                                languageState.texts.CharacterPortrait.Labels
                                  .Life
                              }{" "}
                            </span>
                          </Tippy>

                          <span>
                            {contextState.character.Life.current} /{" "}
                            {contextState.character.Life.max}
                          </span>
                        </Container>
                      </Container>
                      <Container
                        sx={{ ...portraitRow, ...bigFont, ...spaceAround }}
                        id="mana-row"
                      >
                        <span className={label}>{AttributeIcons.mana}</span>
                        <Container sx={{ marginBottom: "2px" }}>
                          <Tippy
                            content={
                              seeMoreAnimation
                                ? languageState.texts.CharacterPortrait.Tooltips
                                    .Mana
                                : ""
                            }
                          >
                            <span className={label}>
                              {
                                languageState.texts.CharacterPortrait.Labels
                                  .Mana
                              }{" "}
                            </span>
                          </Tippy>

                          <span>
                            {contextState.character.Mana.current} /{" "}
                            {contextState.character.Mana.max}
                          </span>
                        </Container>
                      </Container>
                    </Container>
                  </Container>
                  <h3>
                    {languageState.texts.CharacterPortrait.Labels.Description}
                  </h3>
                  <textarea
                    className={description}
                    placeholder={
                      languageState.texts.CharacterPortrait.Placeholders
                        .Description
                    }
                  />
                </>
              </Container>
            </Container>
          )}
        </Container>

        {edit && (
          <>
            {" "}
            <button
              style={{
                visibility: "hidden",
              }}
              id="click"
              disabled={isAnimating}
              onClick={reward}
            >
              Test
            </button>
            <div
              style={{ zIndex: 99, width: "40px", marginLeft: "80px" }}
              id="rewardId"
            ></div>
          </>
        )}
      </Container>
    </>
  );
};

CharacterPortrait.defaultName = "CharacterPortrait";

CharacterPortrait.defaultProps = {
  className: "",
  id: "",
  name: "",
  style: {},
  edit: false,
  changeName: null,
};

/*CharacterPortrait.propTypes = {
  className: PropTypes.string,
  name: PropTypes.string,
  id: PropTypes.string,
  style: PropTypes.object,
  children: PropTypes.element.isRequired(),
};*/

export default CharacterPortrait;
