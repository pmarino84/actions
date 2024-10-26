// deno-lint-ignore-file no-explicit-any
import type { Action } from "./types.ts";

/**
 * Create the action factory for the given type, you can pass any payload you need to the result factory.
 * @param   {string} type Action type
 * @returns               The action factory
 *
 * ```ts
 * import { createAction } from "@pietro/actions";
 *
 * cont increment = createAction<number>("INCREMENT"); // increment = (payload: number) => ({ type: "INCREMENT", payload });
 *
 * const action = increment(2); // action = { type: "INCREMENT", payload: 2 };
 * ```
 */
export function createAction<T = any>(
  type: string,
): (payload?: T) => Action<T> {
  return (payload?: T): Action => ({ type, payload: payload || null });
}

export default createAction;
