// deno-lint-ignore-file no-explicit-any
import type { Action, ActionHandlers } from "./types.ts";
import splitActionType from "./splitActionTypes.ts";

/**
 * Create a map to simplify the management of called actions.
 * Combined actions are separated before being added to the map.
 * @param handlerMap Action handlers
 * @returns          A map [action type, handler]
 */
function actionHandlersToMap(handlerMap: ActionHandlers): ActionHandlers {
  const keys = Object.keys(handlerMap);
  return keys.reduce((map, key) => {
    const actionTypes = splitActionType(key);
    actionTypes.forEach((type) => map[type] = handlerMap[key]);
    return map;
  }, Object.create(null));
}

/**
 * Create the dispatcher to process actions with the correct handler.
 * @param   handlers Action handlers
 * @returns          The dispatcher to process actions with the correct handler
 *
 * ```ts
 * import { type Action, createAction, createDispatcher } from "@pietro/actions";
 *
 * const increment = createAction("INCREMENT");
 * const decrement = createAction("DECREMENT");
 *
 * const value = 0;
 *
 * const handleIncrement = ({ payload }: Action) => value += payload;
 * const handleDecrement = ({ payload }: Action) => value -= payload;
 *
 * const dispatcher = createDispatcher({
 *  ["INCREMENT"]: handleIncrement,
 *  ["DECREMENT"]: handleDecrement,
 * });
 *
 * dispatcher(increment(2)); // => value =  2
 * dispatcher(decrement(3)); // => value = -1
 * ```
 */
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
