// @ts-check

export default class Destructible {
  constructor(options = { name: "", level: 1 }) {
    this.name = options.name;
    this.level = options.level;
  }

  // getter
  get Name() {
    return this.name;
  }

  get Level() {
    return this.level;
  }

  // setter
  set Name(newName) {
    this.name = newName;
  }

  set Level(newLevel) {
    this.level = newLevel;
  }
}
