
/**
 * @author Sito 
 */
export default class Config {

	/**
	 * @param {object} attributes
 	 */ 
	constructor(attributes = {}) {
		this.attributes = attributes;
	}

	/**
	 * @param {string} value
	 */
	getKey(value) {
		return this.attributes.value;
	}

	/**
	 * @param {string} value
	 * @param {any} newValue
	 */
	setKey(value, newValue) {
		this.attributes.value = newValue;
	}

}