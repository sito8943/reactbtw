export const LoadFromStorage = () => {
  const toReturn = {};
  if (localStorage.getItem("user") !== null) {
    // user
    toReturn.user = {};
    toReturn.user.id = localStorage.getItem("user").Id;
    toReturn.user.name = localStorage.getItem("user").Name;
    toReturn.user.photo = localStorage.getItem("user").Photo;
    toReturn.user.level = localStorage.getItem("user").Level;
    // audio
    toReturn.audio = {};
    /* toReturn.audio.bfx = storageFunction
      .fromLocalStorage("audio")
      .getKey("bfx");
    toReturn.audio.sfx = storageFunction
      .fromLocalStorage("audio")
      .getKey("sfx");
    toReturn.audio.bfxVolumen = storageFunction
      .fromLocalStorage("audio")
      .getKey("bfxVolumen");
    toReturn.audio.sfxVolumen = storageFunction
      .fromLocalStorage("audio")
      .getKey("sfxVolumen");
    // graphic
    toReturn.graphic = {};
    toReturn.graphic.animations = storageFunction
      .fromLocalStorage("graphic")
      .getKey("animations"); */
  } else {
    // user
    toReturn.user = {};
    toReturn.user.id = sessionStorage.getItem("user").Id;
    toReturn.user.name = sessionStorage.getItem("user").Name;
    toReturn.user.photo = sessionStorage.getItem("user").Photo;
    toReturn.user.level = sessionStorage.getItem("user").Level;
    // audio
    toReturn.audio = {};
    /*toReturn.audio.bfx = storageFunction
      .fromSessionStorage("audio")
      .getKey("bfx");
    toReturn.audio.sfx = storageFunction
      .fromSessionStorage("audio")
      .getKey("sfx");
    toReturn.audio.bfxVolumen = storageFunction
      .fromSessionStorage("audio")
      .getKey("bfxVolumen");
    toReturn.audio.sfxVolumen = storageFunction
      .fromSessionStorage("audio")
      .getKey("sfxVolumen");
    // graphic
    toReturn.graphic = {};
    toReturn.graphic.animations = storageFunction
      .fromSessionStorage("graphic")
      .getKey("animations"); */
  }
  return toReturn;
};

/**
 * @param {boolean} session
 */
export const SaveToStorage = (session, values) => {
  if (!session) {
    // user
    localStorage.setItem("user", values.user);
    // audio
    localStorage.setItem("audio", values.audio);
    // graphic
    localStorage.setItem("graphic", values.graphic);
  } else {
    // user
    sessionStorage.setItem("user", values.user);
    // audio
    sessionStorage.setItem("audio", values.audio);
    // graphic
    sessionStorage.setItem("graphic", values.graphic);
  }
};

export const ClearStorage = () => {
  // user
  localStorage.setItem("user", null);
  sessionStorage.setItem("user", null);
  // audio
  localStorage.setItem("audio", null);
  sessionStorage.setItem("audio", null);
  // graphic
  localStorage.setItem("graphic", null);
  sessionStorage.setItem("graphic", null);
};
