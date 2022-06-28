import { useEffect } from "react";

// prop types
import PropTypes from "prop-types";

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

// styles
import { actionTitle, actions, disabledActions } from "./style";

const ActionMenu = (props) => {
  const { visible, playing, onClose, action } = props;

  const { languageState } = useLanguage();

  useEffect(() => {
    /* console.log(document.getElementById("action"));
    document.getElementById("action").onkeydown = (e) => {
      console.log(e);
    }; */
    // console.log(document.getElementById("action").children[1]);
    // console.log(document.getElementById("action").onkeydown);
  }, []);

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
    <ActionModal id="action-modal" visible={visible} onClose={onClose}>
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
            <SitoContainer id="action-list">
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
