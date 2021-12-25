export default class User {
  /**
   *
   * @param {number} id
   * @param {string} name
   */
  constructor(id = "", name = "", email = "") {
    this.id = id;
    this.name = name;
    this.email = email;
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
}
