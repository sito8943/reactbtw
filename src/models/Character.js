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

export default class Character extends Destructible {
  constructor(options = { name: "", level: 1, class: 0, actions: {} }) {
    super({ name: options.name, level: options.level });
    this.CreateClass(CreationClass[options.class]);
    this.actions = options.actions;
  }

  CreateClass = (newClass) => {
    this.class = newClass.Id;
    this.attack = { current: newClass.Attack, max: newClass.Attack };
    this.armor = { current: newClass.Armor, max: newClass.Armor };
    this.life = { current: newClass.Life, max: newClass.Life };
    this.mana = { current: newClass.Mana, max: newClass.Mana };
    this.luck = { current: newClass.Luck, max: newClass.Luck };
    this.speed = { current: newClass.Speed, max: newClass.Speed };
  };

  // life modifiers
  TakeDamage(damage) {
    if (damage > 0) this.life.current -= damage - this.ArmorReduction();
    else this.life.current -= damage;
    if (this.life.current < 0) return true;
    return false;
  }

  // mana modifiers
  UseMana(amount) {
    if (this.mana.current >= amount) {
      this.mana.current -= amount;
      return true;
    }
    return false;
  }

  // getter

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

  get Name() {
    return this.name;
  }

  get Level() {
    return this.level;
  }

  get Class() {
    return this.class;
  }

  get Attack() {
    return this.attack;
  }

  get Armor() {
    return this.armor;
  }

  get Speed() {
    return this.speed;
  }

  get ArmorReduction() {
    return this.armor.current * this.level + this.life.current / 10;
  }

  get Life() {
    return this.life;
  }

  get Mana() {
    return this.mana;
  }

  get Luck() {
    return this.luck;
  }

  // setter

  SetAction = (type, which, to) => {
    this.actions[type][which] = to;
  };

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

  set Attack(attackModifier) {
    this.attack.current = attackModifier;
  }

  set Speed(speedModifier) {
    this.speed.current = speedModifier;
  }

  set Armor(armorModifier) {
    this.armor.current = armorModifier;
  }

  set Life(lifeModifier) {
    this.life = lifeModifier;
  }

  set Mana(manaModifier) {
    this.mana = manaModifier;
  }

  set Luck(luckModifier) {
    this.luck = luckModifier;
  }
}

export const ExpFormula = (level) => {
  const base = 200;
  let nextLevel = 0;
};
