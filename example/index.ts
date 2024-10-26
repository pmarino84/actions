import {
  type Action,
  combineActions,
  createAction,
  createDispatcher,
} from "../mod.ts";
import FakeWebSocket from "./FakeWebsocket.ts";

const cancel = createAction("CANCEL");
const save = createAction("SAVE");
const kill = createAction("KILL");
const mute = createAction("MUTE");

function logAction({ type, payload }: Action): void {
  const payloadText = payload ? ` ${JSON.stringify(payload)}` : "";
  console.log(`ACTION[${type}] ${payloadText}`);
}

const dispatcher = createDispatcher({
  [combineActions("CANCEL", "SAVE")]: logAction,
  ["KILL"]: logAction,
  ["MUTE"]: logAction,
});

function handleMessage(msg: string): void {
  const action = JSON.parse(msg);
  dispatcher(action);
}

const wss = new FakeWebSocket();

wss.registerActions([
  mute(),
  save("un"),
  save("due"),
  cancel("non c'è due senza tre"),
  save("e il quarto vien da se"),
  kill({ process: "3" }),
]).on("message", handleMessage).simulates();
