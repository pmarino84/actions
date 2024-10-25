import { ACTIONS_SEPARATOR } from "./constants.ts";

export function combineActions(...actions: Array<string>) {
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
