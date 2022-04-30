export default class Character {
  constructor(params) {}

  CreateClass = (newClass) => {
    this.class = newClass.Id;
    this.attack = { current: newClass.Attack, max: newClass.Attack };
    this.armor = { current: newClass.Armor, max: newClass.Armor };
    this.life = newClass.Life;
    this.mana = newClass.Mana;
    this.luck = { current: newClass.Luck, max: newClass.Luck };
  };

  // life modifiers
  TakeDamage(damage) {
    this.life.current -= damage;
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

  get Class() {
    return this.class;
  }

  get Attack() {
    return this.attack;
  }

  get Armor() {
    return this.armor;
  }

  get ArmorReduction() {
    return this.life.current / 2 / this.armor;
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

  set Attack(attackModifier) {
    this.attack.current = attackModifier;
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
