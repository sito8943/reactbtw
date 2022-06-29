// @ts-check

import { CreationClass } from "./Classes";

// models
import Destructible from "./Destructible";

export const NPCEnum = {
  character: {
    actions: {
      basics: {
        attack: "attack",
        run: "run",
        wait: "wait",
      },
      skills: {},
      spells: {},
    },
  },
  dummy: {
    name: "Dummy",
    level: 1,
    class: 0,
    actions: {
      basics: {
        attack: undefined,
        run: undefined,
        wait: "wait",
      },
      skills: {},
      spells: {},
    },
  },
};

/**
 * @author Sito
 */
export default class Character extends Destructible {
  class = -1;
  attack = { current: 0, max: 0 };
  armor = { current: 0, max: 0 };
  life = { current: 0, max: 0 };
  mana = { current: 0, max: 0 };
  luck = { current: 0, max: 0 };
  speed = { current: 0, max: 0 };

  constructor(options = { name: "", level: 1, class: 0, actions: {} }) {
    super({ name: options.name, level: options.level });
    this.CreateClass(CreationClass[options.class]);
    this.actions = options.actions;
  }

  /**
   *
   * @param {object} newClass
   */
  CreateClass = (newClass) => {
    this.class = newClass.Id;
    this.attack = { current: newClass.Attack, max: newClass.Attack };
    this.armor = { current: newClass.Armor, max: newClass.Armor };
    this.life = { current: newClass.Life, max: newClass.Life };
    this.mana = { current: newClass.Mana, max: newClass.Mana };
    this.luck = { current: newClass.Luck, max: newClass.Luck };
    this.speed = { current: newClass.Speed, max: newClass.Speed };
  };

  // * life modifiers
  /**
   *
   * @param {number} damage
   * @returns true if the unit dies, false otherwise
   */
  TakeDamage(damage) {
    if (damage > 0) this.life.current -= damage - this.ArmorReduction;
    else this.life.current -= damage;
    if (this.life.current < 0) return true;
    return false;
  }

  // * mana modifiers
  /**
   *
   * @param {number} amount
   * @returns true if the unit has enough mana, false otherwise
   */
  UseMana(amount) {
    if (this.mana.current >= amount) {
      this.mana.current -= amount;
      return true;
    }
    return false;
  }

  // * getter

  /**
   *
   * @param {string} name
   * @param {string} subName
   * @returns {any} Unit attribute
   */
  GetAttribute = (name, subName = "") => {
    if (!subName) return this[name];
    return this[name][subName];
  };

  // actions

  get Basics() {
    return this.actions.basics;
  }

  get Skills() {
    return this.actions.skills;
  }

  get Spells() {
    return this.actions.spells;
  }

  /**
   * @returns {string}
   */
  get Name() {
    return this.name;
  }

  /**
   * @returns {number}
   */
  get Level() {
    return this.level;
  }

  /**
   * @returns {number}
   */
  get Class() {
    return this.class;
  }

  /**
   * @returns {number} Current attack
   */
  get Attack() {
    return this.attack.current;
  }

  /**
   * @returns {number} Current armor
   */
  get Armor() {
    return this.armor.current;
  }

  /**
   * @returns {number} Current speed
   */
  get Speed() {
    return this.speed.current;
  }

  /**
   * @returns {number}
   */
  get ArmorReduction() {
    return this.armor.current * this.level + this.life.current / 10;
  }

  /**
   * @returns {number} Current life
   */
  get Life() {
    return this.life.current;
  }

  /**
   * @returns {number} Current mana
   */
  get Mana() {
    return this.mana.current;
  }

  /**
   * @returns {number} Current luck
   */
  get Luck() {
    return this.luck.current;
  }

  // * setter

  /**
   *
   * @param {string} type
   * @param {string} which
   * @param {string} to
   */
  SetAction = (type, which, to) => {
    this.actions[type][which] = to;
  };

  /**
   *
   * @param {string} which
   * @param {any} to
   */
  SetAttribute = (which, to) => {
    switch (which) {
      case "class":
        this.CreateClass(CreationClass[to]);
        break;
      default:
        this[which] = to;
        break;
    }
  };

  set Level(newLevel) {
    this.level = newLevel;
  }

  set Name(newName) {
    this.name = newName;
  }

  /**
   * @param {number} attackModifier new current attack
   */
  set Attack(attackModifier) {
    this.attack.current = attackModifier;
  }

  /**
   * @param {number} speedModifier new current speed
   */
  set Speed(speedModifier) {
    this.speed.current = speedModifier;
  }

  /**
   * @param {number} armorModifier new current armor
   */
  set Armor(armorModifier) {
    this.armor.current = armorModifier;
  }

  /**
   * @param {number} lifeModifier new current life
   */
  set Life(lifeModifier) {
    this.life.current = lifeModifier;
  }

  /**
   * @param {number} manaModifier new current mana
   */
  set Mana(manaModifier) {
    this.mana.current = manaModifier;
  }

  /**
   * @param {number} luckModifier new current luck
   */
  set Luck(luckModifier) {
    this.luck.current = luckModifier;
  }
}

export const ExpFormula = (level) => {
  const base = 200;
  let nextLevel = 0;
};
