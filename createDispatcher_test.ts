import { expect } from "@std/expect";
import createAction from "./createAction.ts";
import createDispatcher from "./createDispatcher.ts";

Deno.test("increment count state by 1", () => {
  let count = 0;

  const increment = createAction<number>("INCREMENT");

  const dispatcher = createDispatcher({
    ["INCREMENT"]: ({ payload }) => count += payload,
  });
  dispatcher(increment(1));
  expect(count == 1);
});

Deno.test("decrement count state by 1", () => {
  let count = 0;

  const decrement = createAction<number>("DECREMENT");

  const dispatcher = createDispatcher({
    ["DECREMENT"]: ({ payload }) => count -= payload,
  });
  dispatcher(decrement(1));
  expect(count == -1);
});

Deno.test("incement count state by 1 and decrement by 3", () => {
  let count = 0;

  const increment = createAction<number>("INCREMENT");
  const decrement = createAction<number>("DECREMENT");

  const dispatcher = createDispatcher({
    ["INCREMENT"]: ({ payload }) => count += payload,
    ["DECREMENT"]: ({ payload }) => count -= payload,
  });
  dispatcher(increment(1));
  dispatcher(decrement(3));
  expect(count == -2);
});