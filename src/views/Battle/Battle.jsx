import { useState, useEffect } from "react";

// models
import Character, { NPCEnum } from "../../models/Character";
import Field from "../../models/Field";

// own components
import Animation from "../../components/Animation/Animation";
import CombatPortrait from "../../components/CharacterPortrait/CombatPortrait/CombatPortrait";
import Container from "../../components/Container/Container";
import SpeakDialog from "../../components/SpeakDialog/SpeakDialog";
import ActionMenu from "./ActionMenu/ActionMenu";
import EventsNotification from "./EventsNotification.jsx/EventsNotification";
import EventList from "./EventList/EventList";

// contexts
import { useBattle } from "../../context/BattleProvider";
import ActionBeep from "./ActionBeep/ActionBeep";
import { GetActionTargetType } from "../../models/Action";

const Battle = () => {
  const { battleState, setBattleState } = useBattle();

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
    const enemy = new Character(NPCEnum.dummy);
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

  const order = (localUnits = undefined) => {
    let newOrder = allUnits;
    if (localUnits) newOrder = localUnits;
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

  return (
    <Container
      justifyContent="space-between"
      flexDirection="column"
      sx={{ padding: "18px 20px 10px 20px", height: "95vh" }}
    >
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
      <Container justifyContent="right">
        {enemies.map((item, i) => {
          return (
            <Container
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
            </Container>
          );
        })}
      </Container>
      <button onClick={doAttack}>Hola</button>
      <Container>
        {showAnimation && (
          <Animation
            which="slash"
            target={{
              x: target.x,
              y: target.y,
            }}
          />
        )}
      </Container>
      <Container justifyContent="left">
        {players.map((item, i) => {
          return (
            <Container
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
            </Container>
          );
        })}
      </Container>
    </Container>
  );
};

export default Battle;
