const intervalIds: number[] = [];

/**
 * Starts an interval and remembers its id so it can be stopped later.
 *
 * @param {() => void} callback - Function to run on every tick.
 * @param {number} time - Delay between ticks in milliseconds.
 * @returns {number} The id of the created interval.
 */
export function setStoppableInterval(callback: () => void, time: number): number {
  const id = window.setInterval(callback, time);
  intervalIds.push(id);
  return id;
}


/**
 * Stops every interval created with {@link setStoppableInterval}.
 *
 * @returns {void}
 */
export function stopAllIntervals(): void {
  intervalIds.forEach((id) => window.clearInterval(id));
  intervalIds.length = 0;
}
