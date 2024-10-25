import type { Action } from "./types.ts";

// deno-lint-ignore no-explicit-any
export function createAction<T = any>(
  type: string,
): (payload?: T) => Action<T> {
  return (payload?: T): Action => ({ type, payload: payload || null });
}

export default createAction;
