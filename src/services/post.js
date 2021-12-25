// import { getAuth } from "../auth/auth";
import CryptoJs from "crypto-js";
import axios from "axios";

import config from "../config";

/**
 *
 * @param {object} user
 * @returns
 */
export const login = async (user) => {
  /*try {
    const response = await axios.post(
      `${config.serverUrl}/login`,
      { n: user.n, p: CryptoJs.MD5(user.p).toString() },
      {
        headers: getAuth,
      }
    );
    const result = response.status;
    if (result === 200) {
      const data = await response.data;
      if (data !== "0") return data;
      else return "0";
    }
    return 200;
  } catch (err) {
    return String(err);
  }*/
};