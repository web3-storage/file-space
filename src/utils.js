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
