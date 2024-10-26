import { ACTIONS_SEPARATOR } from "./constants.ts";

/**
 * Combine the given actions in one type.
 * @param actions Actions to combine
 * @returns       The given actions joined with the {@link ACTIONS_SEPARATOR}
 *
 * ```ts
 * import { combineActions } from "@pietro/actions";
 *
 * const combined = combineActions("CANCEL", "SAVE"); // combined = CANCEL|SAVE
 * ```
 */
export function combineActions(...actions: Array<string>): string {
  let list = [];
  if (actions.length === 1) {
    const input = actions[0];
    if (Array.isArray(input)) {
      list = input;
    } else {
      list = [input];
    }
  } else {
    list = actions;
  }
  return list.join(ACTIONS_SEPARATOR);
}

export default combineActions;
