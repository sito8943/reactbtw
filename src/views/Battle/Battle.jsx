import { useState, useEffect } from "react";

// tippy
import Tippy from "@tippyjs/react";

// framer-motion
import { motion } from "framer-motion";

// models
import Character, { NPCEnum } from "../../models/Character";
import Field from "../../models/Field";

// own components
import Animation from "../../components/Animation/Animation";
import CombatPortrait from "../../components/CharacterPortrait/CombatPortrait/CombatPortrait";
import SitoContainer from "sito-container";
import SpeakDialog from "../../components/SpeakDialog/SpeakDialog";
import ActionMenu from "./ActionMenu/ActionMenu";
import EventsNotification from "./EventsNotification.jsx/EventsNotification";
import EventList from "./EventList/EventList";
import ActionBeep from "./ActionBeep/ActionBeep";

// icons
import { BasicIcons } from "../../assets/icons/icons";

// modals
import ActionModal from "../../components/Modal/ActionModal/ActionModal";

// contexts
import { useLanguage } from "../../context/Language";
import { useBattle } from "../../context/BattleProvider";
import { GetActionTargetType } from "../../models/Action";
import { css } from "@emotion/css";

const Battle = () => {
  const { battleState, setBattleState } = useBattle();
  const { languageState } = useLanguage();

  // modals
  const [showAction, setShowAction] = useState(false);
  const onCloseAction = () => {
    setShowAction(false);
  };

  // units
  const [playingUnit, setPlayingUnit] = useState();
  const [enemies, setEnemies] = useState([]);
  const [players, setPlayers] = useState([]);
  const [allUnits, setAllUnits] = useState([]);

  const [showActionBeep, setShowActionBeep] = useState(false);
  const [showAnimation, setShowAnimation] = useState(false);
  const [showEventList, setShowEventList] = useState(false);
  const [showCharacterAction, setShowCharacterAction] = useState(false);
  const [target, setTarget] = useState({ offsetLeft: 0, offsetTop: 0 });

  useEffect(() => {
    const dataUser = localStorage.getItem("btw-user-data");
    const player = new Character({
      ...JSON.parse(dataUser),
      ...NPCEnum.character,
    });
    player.SetAttribute("team", 1);
    const enemy = new Character(NPCEnum.dummy);
    enemy.SetAttribute("team", 2);
    setPlayingUnit(player);
    setShowAction(true);
    setPlayers([player]);
    setEnemies([enemy]);
    setAllUnits([player, enemy]);
    order([player, enemy]);
    setBattleState({
      type: "init",
      field: new Field(),
      goodTeam: [player],
      evilTeam: [enemy],
    });

    document.body.onkeydown = (e) => {
      if (e.key === "Escape") {
        console.log(showActionBeep, showCharacterAction);
        if (showCharacterAction) setShowCharacterAction(false);
        else if (showActionBeep) {
          setShowActionBeep(false);
          setShowCharacterAction(true);
        }
      }
    };
  }, []);

  useEffect(() => {}, []);

  const order = (localUnits = undefined) => {
    let newOrder = allUnits;
    if (localUnits) newOrder = localUnits;
    console.log(newOrder);
  };

  const doAttack = () => {
    setShowAnimation(true);
    const currentTarget = document.getElementById("Hola");
    setTarget({
      x: currentTarget.offsetLeft + 70, // + currentTarget.offsetWidth / 2,
      y: currentTarget.offsetTop + 85, // + currentTarget.offsetHeight / 2,
      class: "",
      player: 0,
      index: 0,
    });
    setTimeout(() => {
      setShowAnimation(false);
      setTarget({
        x: currentTarget.offsetLeft + 70, // + currentTarget.offsetWidth / 2,
        y: currentTarget.offsetTop + 85, // + currentTarget.offsetHeight / 2,
        subclass: "hit",
        class: "red",
        player: 0,
        index: 0,
      });
      setTimeout(() => {
        setTarget({
          x: currentTarget.offsetLeft + 70, // + currentTarget.offsetWidth / 2,
          y: currentTarget.offsetTop + 85, // + currentTarget.offsetHeight / 2,
          class: "",
          index: -1,
        });
      }, 301);
    }, 500);
  };

  useEffect(() => {
    if (battleState.action) {
      setShowCharacterAction(false);
      setShowActionBeep(true);
    } else setShowActionBeep(false);
  }, [battleState.action]);

  const action = (e) => {
    let node = e.target;
    if (node.nodeName === "path") node = node.parentNode;
    if (node.nodeName === "svg") node = node.parentNode;
    const actionType = GetActionTargetType(node.id.substring(1));
    setBattleState({ type: "selecting-action", actionType });
  };

  // styles
  const actionTitle = css({
    margin: 0,
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

  const apparition = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
    },
  };

  return (
    <SitoContainer
      justifyContent="space-between"
      flexDirection="column"
      sx={{ padding: "18px 20px 10px 20px", height: "95vh" }}
    >
      <ActionModal visible={showAction} onClose={onCloseAction}>
        {playingUnit && playingUnit.Name && (
          <>
            <h3
              className={actionTitle}
            >{`${languageState.texts.Battle.Actions.Title} ${playingUnit.Name}`}</h3>
            <motion.ul
              variants={container}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              style={{ padding: 0 }}
            >
              <SitoContainer>
                {Object.keys(playingUnit.Basics).map((item) => (
                  <motion.div
                    key={item}
                    variants={ulItem}
                    viewport={{ once: true }}
                  >
                    <Tippy
                      content={languageState.texts.Battle.Actions.Basics[item]}
                    >
                      <SitoContainer
                        sx={{
                          cursor: "pointer",
                          padding: "5px",
                          borderRadius: "1rem",
                          transition: "all 500ms ease",
                          color: "aliceblue",
                          fontSize: "25px",
                          "&:hover": {
                            transform: "translateY(-10px)",
                            backgroundColor: "#333",
                          },
                        }}
                      >
                        {BasicIcons[item]}
                      </SitoContainer>
                    </Tippy>
                  </motion.div>
                ))}
              </SitoContainer>
            </motion.ul>
          </>
        )}
      </ActionModal>
      <EventsNotification action={() => setShowEventList(true)} />
      {players.length > 0 && (
        <ActionMenu
          action={action}
          playing={players[0]}
          visible={showCharacterAction}
        />
      )}
      <ActionBeep visible={showActionBeep} />
      <EventList visible={showEventList} />
      {/* <SpeakDialog visible={true} /> */}
      <SitoContainer justifyContent="right">
        {enemies.map((item, i) => {
          return (
            <SitoContainer
              key={`enemy${item.Name}${i}`}
              className={
                target.player === 0 && target.index === i ? target.subclass : ""
              }
            >
              <CombatPortrait
                id="Hola"
                character={item}
                className={
                  target.player === 0 && target.index === i ? target.class : ""
                }
              />
            </SitoContainer>
          );
        })}
      </SitoContainer>
      <button onClick={doAttack}>Hola</button>
      <SitoContainer>
        {showAnimation && (
          <Animation
            which="slash"
            target={{
              x: target.x,
              y: target.y,
            }}
          />
        )}
      </SitoContainer>
      <SitoContainer justifyContent="left">
        {players.map((item, i) => {
          return (
            <SitoContainer
              key={`${item.Name}${i}`}
              className={
                target.player === 1 && target.index === i ? target.subclass : ""
              }
            >
              <CombatPortrait
                id="item.Name"
                character={item}
                className={`${
                  target.player === 1 && target.index === i ? target.class : ""
                } unit-ready`}
              />
            </SitoContainer>
          );
        })}
      </SitoContainer>
    </SitoContainer>
  );
};

export default Battle;
