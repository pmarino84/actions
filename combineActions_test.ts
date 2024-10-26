import { expect } from "@std/expect";
import combineActions from "./combineActions.ts";

Deno.test("combine 'CANCEL' and 'UNDO' actions in one type 'CANCEL|UNDO'", () => {
  const combined = combineActions("CANCEL", "UNDO");
  expect(combined).toBe("CANCEL|UNDO");
});