import { storageFunction } from "storage-function";

export const LoadFromStorage = () => {
	const toReturn = {};
	if (storageFunction.fromLocalStorage("user") !== null) {
		// user
		toReturn.user = {};
		toReturn.user.id = storageFunction.fromLocalStorage("user").Id;
		toReturn.user.name = storageFunction.fromLocalStorage("user").Name;
		toReturn.user.photo = storageFunction.fromLocalStorage("user").Photo;
		toReturn.user.level = storageFunction.fromLocalStorage("user").Level;
		// audio
		toReturn.audio = {};
		toReturn.audio.bfx = storageFunction.fromLocalStorage("audio").getKey("bfx");
		toReturn.audio.sfx = storageFunction.fromLocalStorage("audio").getKey("sfx");
		toReturn.audio.bfxVolumen = storageFunction.fromLocalStorage("audio").getKey("bfxVolumen");
		toReturn.audio.sfxVolumen = storageFunction.fromLocalStorage("audio").getKey("sfxVolumen");
		// graphic
		toReturn.graphic = {};
		toReturn.graphic.animations = storageFunction.fromLocalStorage("graphic").getKey("animations");
	} else {
		// user
		toReturn.user = {};
		toReturn.user.id = storageFunction.fromSessionStorage("user").Id;
		toReturn.user.name = storageFunction.fromSessionStorage("user").Name;
		toReturn.user.photo = storageFunction.fromSessionStorage("user").Photo;
		toReturn.user.level = storageFunction.fromSessionStorage("user").Level;
		// audio
		toReturn.audio = {};
		toReturn.audio.bfx = storageFunction.fromSessionStorage("audio").getKey("bfx");
		toReturn.audio.sfx = storageFunction.fromSessionStorage("audio").getKey("sfx");
		toReturn.audio.bfxVolumen = storageFunction.fromSessionStorage("audio").getKey("bfxVolumen");
		toReturn.audio.sfxVolumen = storageFunction.fromSessionStorage("audio").getKey("sfxVolumen");
		// graphic
		toReturn.graphic = {};
		toReturn.graphic.animations = storageFunction.fromSessionStorage("graphic").getKey("animations");
	}
	return toReturn;
}

/**
 * @param {boolean} session
 */
export const SaveToStorage = (session, values) => {
	if (!session) {
		// user
		storageFunction.toLocalStorage("user", values.user);
		// audio
		storageFunction.toLocalStorage("audio", values.audio);
		// graphic
		storageFunction.toLocalStorage("graphic", values.graphic);
	} else {
		// user
		storageFunction.toSessionStorage("user", values.user);
		// audio
		storageFunction.toSessionStorage("audio", values.audio);
		// graphic
		storageFunction.toSessionStorage("graphic", values.graphic);
	}
}

export const ClearStorage = () => {
	// user
	storageFunction.toLocalStorage("user", null);
	storageFunction.toSessionStorage("user", null);
	// audio
	storageFunction.toLocalStorage("audio", null);
	storageFunction.toSessionStorage("audio", null);
	// graphic
	storageFunction.toLocalStorage("graphic", null);
	storageFunction.toSessionStorage("graphic", null);
}