import { combineActions, createAction, createDispatcher } from "../mod.ts";
import FakeWebSocket from "./FakeWebsocket.ts";
import logAction from "./logActions.ts";

// queste action in realtà sono funzioni così il payload può variare (per essere il più flessibili che si può)
// quindi una volta chiamate restituiscono l'oggetto { type, payload }
// si può sempre fare: `const azione = createAction("TIPO")();` così hai direttamente il risultato

// guarda più in basso dove c'è `registerActions` un esempio
const cancel = createAction("CANCEL");
const save = createAction("SAVE");
const kill = createAction("KILL");
const mute = createAction("MUTE");

const dispatcher = createDispatcher({
  [combineActions("CANCEL", "SAVE")]: logAction,
  ["KILL"]: logAction,
  ["MUTE"]: logAction,
});

function handleWorkerMessage(msg: string): void {
  const action = JSON.parse(msg);
  dispatcher(action);
}

// qui sotto c'è il simulatore di quello che avverrebbe nella tua applicazione
// l'unica parte importante è l'on o meglio il listener qui sopra `handleWorkerMessage`

const wss = new FakeWebSocket();

wss.registerActions([
  mute(),
  save("un"),
  save("due"),
  cancel("non c'è due senza tre"),
  save("e il quarto vien da se"),
  kill({ process: "3" }),
]).on("message", handleWorkerMessage).simulates();
