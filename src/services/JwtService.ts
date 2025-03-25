import ApiService from "@/services/ApiService";

const ID_TOKEN_KEY = "access_token" as string;

/**
 * @description get token form localStorage
 */
export const getToken = (): string | null => {
  return window.localStorage.getItem(ID_TOKEN_KEY);
};

/**
 * @description save token into localStorage
 * @param token: string
 */
export const saveToken = (token: string): void => {
  window.localStorage.setItem(ID_TOKEN_KEY, token);
};

/**
 * @description remove token form localStorage
 */
export const destroyToken = (): void => {
  window.localStorage.removeItem(ID_TOKEN_KEY);
};

export const saveRefresh = (token: string): void => {
  window.localStorage.setItem("refresh_token", token);
};

export const destroyRefresh = (): void => {
  window.localStorage.removeItem("refresh_token");
};

export const destroyAccess = (): void => {
  window.localStorage.removeItem(ID_TOKEN_KEY);
};

export const getRefresh = (): string | null => {
  return window.localStorage.getItem("refresh_token");
};

function setDeviceId(id?: string) {
  if (!id) {
    return;
  }

  document.cookie = `cmmtuuid=${id};`; // Secure; HttpOnly; SameSite=Strict`;
  ApiService.setHeader();
}

function getDeviceId() {
  return document.cookie.replace(
    /(?:(?:^|.*;\s*)cmmtuuid\s*=\s*([^;]*).*$)|^.*$/,
    "$1"
  );
}

export default {
  getToken,
  saveToken,
  destroyToken,
  saveRefresh,
  destroyRefresh,
  destroyAccess,
  getRefresh,
  setDeviceId,
  getDeviceId,
};
