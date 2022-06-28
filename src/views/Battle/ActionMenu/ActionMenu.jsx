// prop types
import PropTypes from "prop-types";

// @emotion
import { css } from "@emotion/css";

// tippy
import Tippy from "@tippyjs/react";

// framer-motion
import { motion } from "framer-motion";

// icons
import {
  BasicIcons,
  SkillIcons,
  SpellIcons,
} from "../../../assets/icons/icons";

// sito-component
import SitoContainer from "sito-container";

// own components
import ActionModal from "../../../components/Modal/ActionModal/ActionModal";

// contexts

import { useLanguage } from "../../../context/Language";

const ActionMenu = (props) => {
  const { visible, playing, onClose, action } = props;

  const { languageState } = useLanguage();

  // styles
  const actionTitle = css({
    margin: 0,
  });

  const actions = css({
    border: "none",
    cursor: "pointer",
    background: "none",
    padding: "5px",
    paddingBottom: 0,
    borderRadius: "1rem",
    transition: "all 500ms ease",
    color: "aliceblue",
    fontSize: "25px",
    marginRight: "10px",
    "&:hover": {
      transform: "translateY(-5px)",
      backgroundColor: "#333",
    },
  });

  const disabledActions = css({
    border: "none",
    padding: "5px",
    paddingBottom: 0,
    borderRadius: "1rem",
    transition: "all 500ms ease",
    color: "#828785",
    fontSize: "25px",
    backgroundColor: "#222",
    marginRight: "10px",
  });

  // animations
  const container = {
    hidden: { opacity: 1, scale: 0 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        delayChildren: 0.3,
        staggerChildren: 0.2,
      },
    },
  };

  const ulItem = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
    },
  };

  return (
    <ActionModal visible={visible} onClose={onClose}>
      {playing && playing.Name && (
        <>
          <h3
            className={actionTitle}
          >{`${languageState.texts.Battle.Actions.Title} ${playing.Name}`}</h3>
          <motion.ul
            variants={container}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            style={{ padding: 0 }}
          >
            <SitoContainer>
              {/* basics */}
              {Object.keys(playing.Basics).map((item) => (
                <motion.div
                  key={item}
                  variants={ulItem}
                  viewport={{ once: true }}
                >
                  <Tippy
                    content={languageState.texts.Battle.Actions.Basics[item]}
                  >
                    <button
                      id={`basic-${item}`}
                      onClick={action}
                      className={actions}
                    >
                      {BasicIcons[item]}
                    </button>
                  </Tippy>
                </motion.div>
              ))}
              {/* skills */}
              {Object.keys(playing.Skills).length ? (
                <>
                  {Object.keys(playing.Skills).map((item) => (
                    <motion.div
                      key={item}
                      variants={ulItem}
                      viewport={{ once: true }}
                    >
                      <Tippy
                        content={
                          languageState.texts.Battle.Actions.Basics[item]
                        }
                      >
                        <button
                          id={`skill-${item}`}
                          onClick={action}
                          className={actions}
                        >
                          {BasicIcons[item]}
                        </button>
                      </Tippy>
                    </motion.div>
                  ))}{" "}
                </>
              ) : (
                <motion.div variants={ulItem} viewport={{ once: true }}>
                  <Tippy content={languageState.texts.Battle.Actions.NoSkills}>
                    <button className={disabledActions}>
                      {SkillIcons.icon}
                    </button>
                  </Tippy>
                </motion.div>
              )}
              {/* spells */}
              {Object.keys(playing.Spells).length ? (
                <>
                  {Object.keys(playing.Spells).map((item) => (
                    <motion.div
                      key={item}
                      variants={ulItem}
                      viewport={{ once: true }}
                    >
                      <Tippy
                        content={
                          languageState.texts.Battle.Actions.Basics[item]
                        }
                      >
                        <button
                          id={`spell-${item}`}
                          onClick={action}
                          className={actions}
                        >
                          {BasicIcons[item]}
                        </button>
                      </Tippy>
                    </motion.div>
                  ))}{" "}
                </>
              ) : (
                <motion.div variants={ulItem} viewport={{ once: true }}>
                  <Tippy content={languageState.texts.Battle.Actions.NoSpells}>
                    <button className={disabledActions}>
                      {SpellIcons.icon}
                    </button>
                  </Tippy>
                </motion.div>
              )}
            </SitoContainer>
          </motion.ul>
        </>
      )}
    </ActionModal>
  );
};

ActionMenu.propTypes = {
  visible: PropTypes.bool.isRequired,
  playing: PropTypes.object,
  onClose: PropTypes.func.isRequired,
};

export default ActionMenu;
