// deno-lint-ignore-file no-explicit-any
import type { Action, ActionHandlers } from "./types.ts";
import splitActionType from "./splitActionTypes.ts";

function actionHandlersToMap(handlerMap: ActionHandlers): ActionHandlers {
  const keys = Object.keys(handlerMap);
  return keys.reduce((map, key) => {
    const actionTypes = splitActionType(key);
    actionTypes.forEach((type) => map[type] = handlerMap[key]);
    return map;
  }, Object.create(null));
}

export function createDispatcher(
  handlers: ActionHandlers,
): (action: Action) => any {
  const map = actionHandlersToMap(handlers);
  return (action) => {
    const fn = map[action.type];
    return fn && fn(action);
  };
}

export default createDispatcher;
