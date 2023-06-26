export const TokenName = "startland_token";

const setLocal = (keyName: string) => (keyValue: string) => {
  window.localStorage.setItem(keyName, keyValue);
};

const getLocal = (keyName: string) => {
  return window.localStorage.getItem(keyName);
};

const getSession = (keyName: string) => {
  return window.sessionStorage.getItem(keyName);
};

const removeLocal = (keyName: string) => {
  window.localStorage.removeItem(keyName);
};

const removeSession = (keyName: string) => {
  window.sessionStorage.removeItem(keyName);
};

export const setLocalToken = setLocal(TokenName);

export const getLocalToken = () => getLocal(TokenName);

export const removeLocalToken = () => removeLocal(TokenName);

export const removeSessionToken = () => removeSession(TokenName);

export const getSessionToken = () => getSession(TokenName);
