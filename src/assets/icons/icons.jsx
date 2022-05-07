// react-icons
import {
  // classes
  GiBroadsword, // fighter
  GiCrossbow, // hunter
  GiBurningMeteor, // mage
  GiCrenulatedShield, // defender
  // attributes
  GiClover, // luck
  GiHearts, // life
  GiSpikesInit, // mana
  GiAbdominalArmor, // defense
  GiHeartShield, // protected
  GiCrossedSwords, // attack
  // specials
  GiPerspectiveDiceSixFacesRandom, // random
  // basics
  GiNightSleep, // wait
  GiRun, // run
  // skills
  // spells
  // events
  GiCircleForest,
  GiClockwork,
  GiCompass, // world
} from "react-icons/gi";

export const BasicIcons = {
  wait: <GiNightSleep />,
  run: <GiRun />,
};

export const ClassIcons = [
  <GiBroadsword />,
  <GiCrossbow />,
  <GiBurningMeteor />,
  <GiCrenulatedShield />,
];

export const AttributeIcons = {
  life: <GiHearts />,
  mana: <GiSpikesInit />,
  luck: <GiClover />,
  armor: <GiAbdominalArmor />,
  attack: <GiCrossedSwords />,
};

export const EventIcons = {
  world: <GiCompass />,
};
