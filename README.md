# @pietro/actions

A library to manage commands as actions.
Useful for event systems, browser server communication, app store and other patterns where you need a simple method to communicate for your services.
This module is browser compatible.

## Examples

### App state management

```ts
import { type Action, createAction, createDispatcher } from "@pietro/actions";

const increment = createAction("INCREMENT");
const decrement = createAction("DECREMENT");

const appState = { value: 0 };

const handleIncrement = ({ payload }: Action) => appState.value += payload;
const handleDecrement = ({ payload }: Action) => appState.value -= payload;

const dispatcher = createDispatcher({
 ["INCREMENT"]: handleIncrement,
 ["DECREMENT"]: handleDecrement,
});

dispatcher(increment(2)); // => appState.value =  2
dispatcher(decrement(3)); // => appState.value = -1
```

### Browser server communication

```ts
// server.ts
import { type Action, createAction, createDispatcher } from "@pietro/actions";
import express from "express";
import cors from "cors";
import bodyParser from "body-parser";

const increment = createAction<number>("INCREMENT");
const decrement = createAction<number>("DECREMENT");

const beAppState = { value: 0 };

const handleIncrement = ({ payload }: Action) => beAppState.value += payload;
const handleDecrement = ({ payload }: Action) => beAppState.value -= payload;

const dispatcher = createDispatcher({
 ["INCREMENT"]: handleIncrement,
 ["DECREMENT"]: handleDecrement,
});

const port = 3000;
const app = express();

app.use(cors());
app.use(bodyParser.json());

app.post("/api/increment", (req, res) => {
  dispatcher(req.body);
  res.json(increment(1));
});

app.post("/api/decrement", (req, res) => {
  dispatcher(req.body);
  res.json(decrement(1));
});

app.listen(port, () => {
  console.log(`Server runnint at port ${port}`);
});
```

```ts
// browser.ts
import { type Action, createAction, createDispatcher } from "@pietro/actions";

const increment = createAction<number>("INCREMENT");
const decrement = createAction<number>("DECREMENT");

const feAppState = { count: 0 };

const visualizer = document.getElementById("count");
visualizer.textContent = feAppState.count;

function handleIncrement({ payload }: Action) {
  feAppState.count += payload;
  visualizer.textContent = feAppState.count;
}

function handleDecrement({ payload }: Action) {
  feAppState.count -= payload;
  visualizer.textContent = feAppState.count;
}

const dispatcher = createDispatcher({
 ["INCREMENT"]: handleIncrement,
 ["DECREMENT"]: handleDecrement,
});

async function send(endpoint: string, action: Action) {
  const response = await fetch(`api/${endpoint}`, {
    method: "POST",
    body: JSON.stringify(action),
  });

  if (!response.ok) return [new Error(`Response status: ${response.status}`), null];

  const result = await response.json();
  return [null, result];
}

async function sendIncrement() {
  const [error, result] = await send("increment", increment(1));
  if (error) return;
  dispatcher(result);
}

async function sendDecrement() {
  const [error, result] = await send("increment", decrement(1));
  if (error) return;
  dispatcher(result);
}

document.getElementById("decrement").addEventListener("click", sendDecrement);
document.getElementById("increment").addEventListener("click", sendIncrement);
```

```html
<!-- inside the body -->
<div class="counter">
  <span id="count"></span>
  <button id="decrement">-</button>
  <button id="increment">+</button>
</div>

<script src="./browser.js"></script>
```
