import { useEffect, useState } from "react";

// react-tooltip
import ReactTooltip from "react-tooltip";

// @emotion/css
import { css } from "@emotion/css";

// models
import { AttributeIcons, ClassIcons } from "../../assets/icons/icons";

// contexts
import { useContext } from "../../context/ContextProvider";
import { useLanguage } from "../../context/Language";
import { useReward } from "react-rewards";

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
  const { contextState } = useContext();
  const { reward, isAnimating } = useReward("rewardId", "confetti");

  // see more states for animation
  const [seeMore, setSeeMore] = useState(false);
  const [portraitAnimation, setPortraitAnimation] = useState(false);
  const [seeMoreAnimation, setSeeMoreAnimation] = useState(false);
  const [attributesAnimation, setAttributesAnimation] = useState(false);

  const [appearDone, setAppearDone] = useState(false);
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
    const time = setTimeout(() => {
      setAppearDone(true);
    }, 5000);
    document.body.onkeydown = () => {
      clearTimeout(time);
      setAppearDone(true);
    };
    return () => {
      document.body.onkeydown = null;
    };
  }, []);

  useEffect(() => {
    if (appearDone) document.getElementById("click").click();
  }, [appearDone]);

  const toggleSeeMore = () => {
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
      <ReactTooltip />
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
            className={appearDone ? "" : "rotate-card"}
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
                disabled={appearDone ? false : true}
              >
                <MdAddCircle
                  style={{
                    opacity: appearDone ? 1 : 0,
                    transition: "all 400ms ease",
                    transform: seeMore ? "rotateZ(45deg)" : "rotateX(0deg)",
                  }}
                />
              </button>
            </Container>
            <span className={characterClass}>
              {ClassIcons[contextState.class]}
            </span>
            <div className={imageContainer}>
              <img
                src={
                  contextState.photo ? contextState.user.photo : femaleHighElf
                }
                alt="character-portrait"
              />
            </div>
            <Container
              sx={{ zIndex: 1, width: "185px" }}
              flexDirection="column"
            >
              <Container sx={portraitRow} id="name-row">
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
                  <span>{contextState.name}</span>
                )}
              </Container>
              <Container sx={portraitRow} id="level-row">
                <span className={label}>
                  {languageState.texts.CharacterPortrait.Labels.Level}{" "}
                </span>
                <span>{contextState.level}</span>
              </Container>
              <Container sx={portraitRow} id="range-row">
                <span className={label}>
                  {languageState.texts.CharacterPortrait.Labels.Range}{" "}
                </span>
                <span>
                  {
                    languageState.texts.CharacterPortrait.Range[
                      contextState.level
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
                <h3>
                  {languageState.texts.CharacterPortrait.Labels.Attributes}
                </h3>
                <Container>
                  <Container flexDirection="column">
                    <Container
                      sx={{ ...portraitRow, ...bigFont, ...spaceAround }}
                      id="attack-row"
                      extraProps={{
                        "data-tip": seeMoreAnimation
                          ? languageState.texts.CharacterPortrait.Tooltips
                              .Attack
                          : "",
                      }}
                    >
                      <span style={{ marginRight: "20px" }} className={label}>
                        {AttributeIcons.attack}
                      </span>
                      <Container sx={{ marginBottom: "2px" }}>
                        <span className={label}>
                          {languageState.texts.CharacterPortrait.Labels.Attack}{" "}
                        </span>
                        <span>{contextState.attack}</span>
                      </Container>
                    </Container>
                    <Container
                      sx={{ ...portraitRow, ...bigFont, ...spaceAround }}
                      id="armor-row"
                      extraProps={{
                        "data-tip": seeMoreAnimation
                          ? languageState.texts.CharacterPortrait.Tooltips.Armor
                          : "",
                      }}
                    >
                      <span className={label}>{AttributeIcons.armor}</span>
                      <Container sx={{ marginBottom: "2px" }}>
                        <span className={label}>
                          {languageState.texts.CharacterPortrait.Labels.Armor}{" "}
                        </span>
                        <span>{contextState.armor}</span>
                      </Container>
                    </Container>
                    <Container
                      sx={{ ...portraitRow, ...bigFont }}
                      id="luck-row"
                      extraProps={{
                        "data-tip": seeMoreAnimation
                          ? languageState.texts.CharacterPortrait.Tooltips.Luck
                          : "",
                      }}
                    >
                      <span style={{ marginRight: "20px" }}>
                        {AttributeIcons.luck}
                      </span>
                      <Container sx={{ marginBottom: "2px" }}>
                        <span className={label}>
                          {languageState.texts.CharacterPortrait.Labels.Luck}{" "}
                        </span>
                        <span>{contextState.luck}</span>
                      </Container>
                    </Container>
                  </Container>

                  <Container flexDirection="column" sx={{ marginLeft: "20px" }}>
                    <Container
                      sx={{ ...portraitRow, ...bigFont, ...spaceAround }}
                      id="life-row"
                      extraProps={{
                        "data-tip": seeMoreAnimation
                          ? languageState.texts.CharacterPortrait.Tooltips.Life
                          : "",
                      }}
                    >
                      <span style={{ marginRight: "20px" }}>
                        {AttributeIcons.life}
                      </span>
                      <Container sx={{ marginBottom: "2px" }}>
                        <span className={label}>
                          {languageState.texts.CharacterPortrait.Labels.Life}{" "}
                        </span>
                        <span>
                          {contextState.life.current} / {contextState.life.max}
                        </span>
                      </Container>
                    </Container>
                    <Container
                      sx={{ ...portraitRow, ...bigFont, ...spaceAround }}
                      id="mana-row"
                      extraProps={{
                        "data-tip": seeMoreAnimation
                          ? languageState.texts.CharacterPortrait.Tooltips.Mana
                          : "",
                      }}
                    >
                      <span className={label}>{AttributeIcons.mana}</span>
                      <Container sx={{ marginBottom: "2px" }}>
                        <span className={label}>
                          {languageState.texts.CharacterPortrait.Labels.Mana}{" "}
                        </span>
                        <span>
                          {contextState.mana.current} / {contextState.mana.max}
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
