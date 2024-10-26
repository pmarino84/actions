import { ACTIONS_SEPARATOR } from "./constants.ts";

/**
 * ATTENTION: for internal use only!
 * Return a list of combined action types
 * @param {string} type Type to check
 * @returns {string[]} list of types founded
 */
export function splitActionType(type: string): Array<string> {
  return type.includes(ACTIONS_SEPARATOR)
    ? type.split(ACTIONS_SEPARATOR)
    : [type];
}

export default splitActionType;
