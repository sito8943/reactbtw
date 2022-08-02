import { useState, useEffect, useReducer, useCallback } from "react";
import Tippy from "@tippyjs/react";

// models
import Character, { NPCEnum } from "../../models/Character";
import Field from "../../models/Field";

// sito components
import SitoContainer from "sito-container";

// own components
import Animation from "../../components/Animation/Animation";
import CombatPortrait from "../../components/CharacterPortrait/CombatPortrait/CombatPortrait";
import StagePresent from "./StagePresent/StagePresent";
import ActionMenu from "./ActionMenu/ActionMenu";
import EventsNotification from "./EventsNotification.jsx/EventsNotification";
import EventList from "./EventList/EventList";
import ActionBeep from "./ActionBeep/ActionBeep";

// contexts
import { useLanguage } from "../../context/Language";

// utils
import { parseNodeUnit, validTarget } from "../../utils/functions";
import { isABot } from "../../utils/bots";

// icons
import { AllIcons } from "../../assets/icons/icons";

// styles
import { actionSelected as actionSelectedStyle } from "./ActionMenu/style";
import { addAnimation, removeAnimation } from "../../utils/animation";

const Stages = {
  Start: 0,
  Tactics: 1,
  Combat: 2,
  Win: 3,
  Defeat: 4,
};

const Battle = () => {
  const { languageState } = useLanguage();

  // turns
  const [turns, setTurns] = useState(1);
  const [stage, setStage] = useState(Stages.Start);
  const [previousStage, setPreviousStage] = useState(-1);
  const [playingOrder, setPlayingOrder] = useState([]);

  const nextStage = () => {
    let delay = 2100;
    let newStage = -1;
    let newPreviousStage = -1;
    // start
    if (stage === Stages.Start && previousStage === -1) {
      newStage = -1;
      newPreviousStage = Stages.Start;
    }
    // after start
    else if (stage === -1 && previousStage === Stages.Start) {
      delay = 100;
      newStage = Stages.Tactics;
      newPreviousStage = -1;
    }
    setTimeout(() => {
      setStage(newStage);
      setPreviousStage(newPreviousStage);
      console.log("hola1");
      /* if (
        newStage === -1 &&
        newPreviousStage === -1 &&
        stage !== Stages.Combat
      ) {
        setPlayingUnit(players[0]);
        setShowAction(true);
      } */
    }, delay);
  };

  useEffect(() => {
    if (stage === Stages.Combat) {
      playingOrder.forEach((item, i) => {
        const { action, target } = unitActions[item.team][i];
        setPlayingUnit(item);
        switch (action) {
          case "attack": {
          }
          case "run": {
          }
          default:
            break;
        }
      });
    } else if (stage === Stages.Tactics) {
      setTimeout(() => {
        lookForFreeUnit();
      }, 1000);
    } else nextStage();
  }, [stage, previousStage]);

  // actions
  const [currentAction, setCurrentAction] = useState("");
  const [selectingTargets, setSelectingTargets] = useState(false);

  // error
  const [errorCode, setErrorCode] = useState("");

  const cleanSelectionVars = () => {
    setSelectingTargets(false);
    setCurrentAction("");
    removeAnimation(playingUnit, "targeter");
    setPlayingUnit(undefined);
  };

  useEffect(() => {
    if (errorCode !== "")
      setTimeout(() => {
        setErrorCode("");
      }, 2000);
  }, [errorCode]);

  const unitActionsReducer = (unitActionsState, action) => {
    switch (action.type) {
      case "init": {
        const { goodUnits, badUnits } = action;
        const newActions = [];
        let row = [];
        for (let i = 0; i < badUnits; i += 1) row.push(-1);
        newActions.push(row);
        row = [];
        for (let i = 0; i < goodUnits; i += 1) row.push(-1);
        newActions.push(row);
        return newActions;
      }
      case "set": {
        const newActions = unitActionsState;
        const { unit, team, newAction, target } = action;
        newActions[team === "good" ? 1 : 0][unit] = {
          action: newAction,
          target,
        };
        console.log(newActions);
        return newActions;
      }
      default:
        return [[], []];
    }
  };

  const [unitActions, setUnitActions] = useReducer(unitActionsReducer, [
    [],
    [],
  ]);

  // modals
  const [showAction, setShowAction] = useState(false);
  const onCloseAction = () => {
    setShowAction(false);
  };

  useEffect(() => {
    if (
      !showAction &&
      playingUnit &&
      !selectingTargets &&
      stage !== Stages.Start
    ) {
      setCurrentAction("awaitingOrders");
      setShowActionBeep(true);
    }
  }, [showAction]);

  const [enemies, setEnemies] = useState([]);
  const [players, setPlayers] = useState([]);
  const [allUnits, setAllUnits] = useState([]);

  const [showActionBeep, setShowActionBeep] = useState(false);
  const [showAnimation, setShowAnimation] = useState(false);
  const [showEventList, setShowEventList] = useState(false);
  const [target, setTarget] = useState({ offsetLeft: 0, offsetTop: 0 });

  // units
  const [playingUnit, setPlayingUnit] = useState();

  const lookForFreeUnit = () => {
    let selected = false;
    for (let i = 0; i < players.length && !selected; i += 1)
      if (!players[i].busy) {
        setPlayingUnit(players[i]);
        setShowAction(true);
        return true;
      }
    return false;
  };

  useEffect(() => {
    if (!playingUnit && stage === -1) {
      let enemyReady = true;
      const selected = lookForFreeUnit();
      for (let i = 0; i < enemies.length && enemyReady; i += 1)
        if (!enemies[i].busy) enemyReady = false;
      if (!selected && !enemyReady) {
        setCurrentAction("opponentThinking");
        setShowActionBeep(true);
      }
      if (!selected && enemyReady) {
        setStage(Stages.Combat);
        setCurrentAction("");
        removeAnimation(playingUnit, "targeter");
        setPlayingUnit(undefined);
        setShowActionBeep(false);
      }
    }
  }, [playingUnit]);

  const onClickEnemyUnit = (e) => {
    const node = parseNodeUnit(e.target);
    const [, index] = node.id.split("-");
    const numberIndex = Number(index);
    if (selectingTargets) {
      const selectingResult = validTarget(
        "enemy",
        players[numberIndex],
        currentAction
      );
      if (selectingResult.error) setErrorCode(selectingResult.error);
      else {
        setUnitActions({
          type: "set",
          unit: playingUnit.index,
          team: "good",
          newAction: currentAction,
          target: numberIndex,
        });
        return cleanSelectionVars();
      }
    }
  };

  const onClickPlayerUnit = (e) => {
    const node = parseNodeUnit(e.target);
    const [, index] = node.id.split("-");
    const numberIndex = Number(index);
    if (selectingTargets) {
      const selectingResult = validTarget(
        "player",
        players[numberIndex],
        currentAction
      );
      if (selectingResult.error) setErrorCode(selectingResult.error);
      else {
        setUnitActions({
          type: "set",
          unit: playingUnit.index,
          team: "good",
          newAction: currentAction,
          target: numberIndex,
        });
        return cleanSelectionVars();
      }
    }
    if (players) {
      removeAnimation(playingUnit, "targeter");
      setPlayingUnit(players[numberIndex]);
    }
    if (!showAction) setShowAction(true);
  };

  const order = (localUnits = undefined) => {
    let newOrder = allUnits;
    if (localUnits) newOrder = localUnits;
    setPlayingOrder(newOrder);
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

  const doRun = (team, unitIndex) => {};

  const doWait = (team, unitIndex) => {};

  const targetBasic = (basicName, unitIndex, team) => {
    switch (basicName) {
      case "attack":
        setShowActionBeep(true);
        setSelectingTargets(true);
        setCurrentAction(basicName);
        break;
      default: // wait - run
        setUnitActions({
          type: "set",
          unit: unitIndex,
          team,
          newAction: basicName,
          target: -1,
        });
        return cleanSelectionVars();
    }
  };

  const actionSelected = (e) => {
    let node = e.target;
    while (node.id === "") node = node.parentNode;
    const [type, name] = node.id.split("-");
    players[playingUnit.index].busy = true;
    switch (type) {
      default: // basic
        return targetBasic(name, playingUnit.index, "good");
    }
  };

  useEffect(() => {
    const dataUser = localStorage.getItem("btw-user-data");
    const player = new Character({
      ...JSON.parse(dataUser),
      ...NPCEnum.character,
    });
    const player1 = new Character({
      ...JSON.parse(dataUser),
      ...NPCEnum.character,
    });
    player1.Name = "Locol";
    player.SetAttribute("index", 0);
    player.SetAttribute("busy", false);
    addAnimation(player, "unit-ready");
    player.SetAttribute("team", 1);
    player1.SetAttribute("index", 1);
    player1.SetAttribute("busy", false);
    addAnimation(player1, "unit-ready");
    player1.SetAttribute("team", 1);

    const enemy = new Character(NPCEnum.dummy);
    enemy.SetAttribute("team", 0);
    enemy.SetAttribute("bot", true);
    enemy.SetAttribute("busy", false);
    // local test
    const localPlayers = [player, player1];
    const localEnemies = [enemy];
    setPlayers([player, player1]);
    setEnemies([enemy]);
    setAllUnits([player, player1, enemy]);
    setUnitActions({
      type: "init",
      goodUnits: localPlayers.length,
      badUnits: localEnemies.length,
    });
    order([player, enemy]);
  }, []);

  useEffect(() => {
    if (enemies) {
      enemies.forEach((item, i) => {
        if (isABot(item) && !item.busy) {
          // console.log(item);
          item.busy = true;
          setUnitActions({
            type: "set",
            unit: i,
            team: "enemy",
            newAction: "attack",
            target: 0,
          });
        }
      });
    }
  }, [unitActions]);

  const keyHandlers = useCallback(
    (e) => {
      if (e.key === "Escape") {
        if (showAction) setShowAction(false);
        else if (showActionBeep) {
          setShowActionBeep(false);
          setShowAction(true);
          players[playingUnit.index].busy = false;
        }
      }
    },
    [showAction, showActionBeep, players, playingUnit]
  );

  useEffect(() => {
    window.addEventListener("keydown", keyHandlers);
    return () => {
      window.removeEventListener("keydown", keyHandlers);
    };
  }, [keyHandlers]);

  return (
    <SitoContainer
      justifyContent="space-between"
      flexDirection="column"
      sx={{ padding: "18px 20px 10px 20px", height: "95vh" }}
      id="battle"
    >
      {stage !== -1 && (
        <StagePresent hide={stage === Stages.Tactics} stage={stage} />
      )}

      <ActionMenu
        visible={showAction}
        onClose={onCloseAction}
        playing={playingUnit}
        action={actionSelected}
      />
      <EventsNotification action={() => setShowEventList(true)} />
      <ActionBeep
        visible={showActionBeep}
        action={currentAction}
        errorCode={errorCode}
      />
      <EventList visible={showEventList} />
      {/* <SpeakDialog visible={true} /> */}
      <SitoContainer justifyContent="right">
        {enemies.map((item, i) => {
          return (
            <SitoContainer
              key={`${item.Name}${i}`}
              id={`enemy-${i}`}
              className={
                target.player === 0 && target.index === i ? target.subclass : ""
              }
              extraProps={{
                onClick: onClickEnemyUnit,
              }}
            >
              <CombatPortrait
                id="Dummy"
                character={item}
                className={selectingTargets ? "possible-target" : ""}
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
              id={`good-${i}`}
              className={
                target.player === 1 && target.index === i ? target.subclass : ""
              }
              extraProps={{
                onClick: onClickPlayerUnit,
              }}
            >
              <SitoContainer
                sx={{
                  position: "absolute",
                  width: "232px",
                  zIndex: 2,
                  transition: "all 500ms ease",
                  transform:
                    playingUnit && playingUnit.index === i && selectingTargets
                      ? "translateY(-20px)"
                      : "translateY(0)",
                }}
                justifyContent="flex-end"
              >
                <Tippy content={languageState.texts.Battle.CancelAction}>
                  <button
                    style={{
                      transition: "all 300ms ease",
                      transform: AllIcons[unitActions[1][i].action]
                        ? "scale(1)"
                        : "scale(0)",
                    }}
                    className={actionSelectedStyle}
                  >
                    {AllIcons[unitActions[1][i].action]}
                  </button>
                </Tippy>
              </SitoContainer>
              <CombatPortrait
                id={item.Name}
                character={item}
                className={`${
                  target.player === 1 && target.index === i ? target.class : ""
                } ${item.GetAttribute("extraAnimation")}`}
              />
            </SitoContainer>
          );
        })}
      </SitoContainer>
    </SitoContainer>
  );
};

export default Battle;
