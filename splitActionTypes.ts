import { ACTIONS_SEPARATOR } from "./constants.ts";

/**
 * ATTENTION: for internal use only!
 * Return a list of combined action types
 * @param {String} type Type to check
 */
export function splitActionType(type: string): Array<string> {
  return type.includes(ACTIONS_SEPARATOR)
    ? type.split(ACTIONS_SEPARATOR)
    : [type];
}

export default splitActionType;
