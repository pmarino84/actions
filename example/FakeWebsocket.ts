// deno-lint-ignore-file no-explicit-any
export default class FakeWebSocket {
  private actions: Array<any>;
  private listeners: Record<string, Array<any>>;

  constructor() {
    this.actions = [];
    this.listeners = {};
  }

  registerActions(actions: Array<any> = []) {
    this.actions = actions;

    return this;
  }

  simulates() {
    console.log("Call the registered actions at random time");
    for (const action of this.actions) {
      setTimeout(() => {
        this.notify(
          "message",
          JSON.stringify(action), /* simulo il messaggio ricevuto dal browser */
        );
      }, Math.random() * 1000);
    }

    return this;
  }

  notify(event: string, msg: string) {
    const listeners = this.listeners[event];

    if (listeners && listeners.length) {
      listeners.forEach((listener) => {
        listener(msg);
      });
    }
  }

  on(event: string, handler: (action: any) => void) {
    const listeners = this.listeners[event] || (this.listeners[event] = []);

    if (!listeners.includes(handler)) {
      listeners.push(handler);
    }

    return this;
  }
}
