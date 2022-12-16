import { useHref } from "react-router";

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
  // TODO: hacky solution, works only with hash router.
  return `${window.location.protocol}//${window.location.host}${
    window.location.pathname
  }${useHref(path)}`;
}
