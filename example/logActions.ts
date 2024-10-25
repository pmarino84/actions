import type { Action } from "../types.ts";

export default function logAction({ type, payload }: Action): void {
  const payloadText = payload ? ` ${JSON.stringify(payload)}` : "";
  console.log(`ACTION[${type}] ${payloadText}`);
}
