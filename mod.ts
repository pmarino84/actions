// Copyright (c) 2024 Pietro Marino. All rights reserved. MIT license.
// This module is browser compatible.

/**
 * A library to manage commands as actions.
 * Useful for event systems, browser server communication, app store and other patterns where you need a simple method to communicate for your services. 
 * This module is browser compatible.
 * 
 * ```ts
 * import { type Action, createAction, createDispatcher } from "@pietro/actions";
 *
 * const increment = createAction("INCREMENT");
 * const decrement = createAction("DECREMENT");
 *
 * const appState = { value: 0 };
 *
 * const handleIncrement = ({ payload }: Action) => appState.value += payload;
 * const handleDecrement = ({ payload }: Action) => appState.value -= payload;
 *
 * const dispatcher = createDispatcher({
 *  ["INCREMENT"]: handleIncrement,
 *  ["DECREMENT"]: handleDecrement,
 * });
 *
 * dispatcher(increment(2)); // => appState.value =  2
 * dispatcher(decrement(3)); // => appState.value = -1
 * ```
 * 
 * @module
 */

export { combineActions } from "./combineActions.ts";
export * from "./constants.ts";
export { createAction } from "./createAction.ts";
export { createDispatcher } from "./createDispatcher.ts";
export * from "./types.ts";
