/* eslint-disable no-bitwise */

export function hashMessage(message: string): string {
  let result: number;

  for (const char of message) {
    result = (result << 5) - result + char.charCodeAt(0);
    result |= 0;
  }

  return String(result);
}

export const wait = (ms: number) => new Promise(r => setTimeout(r, ms));
