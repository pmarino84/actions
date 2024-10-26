// deno-lint-ignore-file no-explicit-any

/** Action schema  */
export type Action<T = any> = { type: string; payload?: T };

/** Action handlers schema  */
export type ActionHandlers = Record<string, (action: Action) => any>;
