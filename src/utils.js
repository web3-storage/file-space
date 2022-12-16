import { useHref } from "react-router";

export const APP_BASENAME =
  window.location.hostname.toString() === "web3-storage.github.io"
    ? "/file-space"
    : "";

/**
 *
 * @param {Event} e
 * @returns
 */
export function killEvent(e) {
  e.stopPropagation();
  e.preventDefault();
  return false;
}

/**
 *
 * @param {number} bytes
 * @param {number} decimals
 * @returns {string}
 */
export function formatBytes(bytes, decimals = 2) {
  if (!+bytes) return "0 Bytes";

  const k = 1024;
  const dm = decimals < 0 ? 0 : decimals;
  const sizes = ["Bytes", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"];

  const i = Math.floor(Math.log(bytes) / Math.log(k));

  return `${parseFloat((bytes / Math.pow(k, i)).toFixed(dm))} ${sizes[i]}`;
}

export function useAbsoluteHref(path) {
  return `${window.location.protocol}//${
    window.location.host
  }${APP_BASENAME}${useHref(path)}`;
}
