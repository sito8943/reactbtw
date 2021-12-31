export default class User {
  /**
   *
   * @param {number} id
   * @param {string} name
   * @param {string} photo
   * @param {number} level
   * @param {number} action
   */
  constructor(id = "", name = "", email = "", photo = "", level = 0, action = 0) {
    this.id = id;
    this.name = name;
    this.email = email;
    this.photo = photo;
    this.level = level;
    this.action = action;
  }

  /**
   * @param {object} user
   */
  setUser (user) {
    this.id = user.id;
    this.name = user.name;
    this.email = user.email;
    this.photo = user.photo;
    this.level = user.level;
    this.action = user.action;
  }

  /**
   * @returns user's id
   */
  get Id() {
    return this.id;
  }

  /**
   * @param id
   */
  set Id(id) {
    this.id = id;
  }

  /**
   * @returns user's name
   */
  get Name() {
    return this.name;
  }

  /**
   * @param {string} name
   */
  set Name(name) {
    this.name = name;
  }

  /**
   * @returns user's email
   */
  get Email() {
    return this.email;
  }

  /**
   * @param {string} email
   */
  set Email(email) {
    this.email = email;
  }

  /**
   * @returns user's photo
   */
  get Photo() {
    return this.photo;
  }

  /**
   * @param {string} photo
   */
  set Photo(photo) {
    this.photo = photo;
  }

  /**
   * @returns user's level
   */
  get Level() {
    return this.level;
  }

  /**
   * @param {string} level
   */
  set Level(level) {
    this.level = level;
  }

    /**
   * @returns user's action
   */
  get Action() {
    return this.action;
  }

  /**
   * @param {string} action
   */
  set Action(action) {
    this.action = action;
  }

}
