// deno-lint-ignore-file no-explicit-any
export type Action<T = any> = { type: string; payload?: T };

export type ActionHandlers = Record<string, (action: Action) => any>;
