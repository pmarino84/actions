import { expect } from "@std/expect";
import createAction from "./createAction.ts";

Deno.test("create increment action factory", () => {
  const increment = createAction<number>("INCREMENT");
  expect(increment(1)).toEqual({ type: "INCREMENT", payload: 1 });
});