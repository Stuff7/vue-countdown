import { getLocalItem } from "miscfe/storage";

export default function countdown(milliseconds: number, callback: (milliseconds: number) => unknown) {
  if (milliseconds <= 0) {
    return;
  }

  let remainingTime = milliseconds;
  let previousTimestamp = performance.now();

  function updateTimer(timestamp: number) {
    const elapsedTime = timestamp - previousTimestamp;

    if (elapsedTime >= 1000) {
      remainingTime -= 1000;
      callback(Math.max(remainingTime, 0));
      previousTimestamp = timestamp;
    }

    if (remainingTime > 0) {
      requestAnimationFrame(updateTimer);
    }
  }

  requestAnimationFrame(updateTimer);
}

export interface Countdown {
  name: string,
  end: number,
  duration: number,
}

export function getCountdowns() {
  return getLocalItem("countdowns", [], (rawValue): WithId<Countdown>[] => {
    try {
      const parsed = JSON.parse(rawValue);
      if (!(parsed instanceof Array)) {
        console.warn("countdowns must be an array.\nInstead got ", rawValue);
        return [];
      }
      if (parsed.every(isCountdown)) {
        return parsed;
      }
      console.warn("countdowns does not extend Countdown", rawValue);
      return [];
    } catch (e) {
      console.warn("Failed to parse JSON countdowns", e);
      return [];
    }
  });
}

export function isCountdown(obj: object | Record<string, unknown>): obj is WithId<Countdown> {
  return typeof obj === "object" && (
    "id" in obj && typeof obj.id === "string" &&
    "name" in obj && typeof obj.name === "string" &&
    "duration" in obj && typeof obj.duration === "number" &&
    "end" in obj && typeof obj.end === "number"
  );
}
