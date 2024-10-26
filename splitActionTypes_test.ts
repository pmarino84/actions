import { expect } from "@std/expect";
import splitActionType from "./splitActionTypes.ts";

Deno.test("split combined action 'CANCEL|UNDO' into 'CANCEL' and 'UNDO' actions", () => {
  const actions = splitActionType("CANCEL|UNDO");
  expect(actions).toEqual(["CANCEL", "UNDO"]);
});