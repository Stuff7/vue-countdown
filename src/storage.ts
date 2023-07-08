function stringify<T>(value: T) {
  if (value === null) {
    return null;
  }
  return typeof value === "object" ?
    JSON.stringify(value) :
    `${value}`;
}

function prefix(key: string) {
  return `VCD__${key}` as const;
}

export function getLocalItem<T = string, U extends Option<T> = Option<T>>(
  key: string,
  fallback = null as U | T,
  callback: Option<(rawValue: string) => T> = null,
): U extends T ? T : Option<T> {
  const rawValue = localStorage.getItem(prefix(key));
  if (!rawValue) {
    return fallback as T;
  }
  return callback ? callback(rawValue) : rawValue as T;
}

export function setLocalItem<T>(key: string, value: T) {
  const itemKey = prefix(key);
  const itemValue = stringify(value);
  if (itemValue == null) {
    localStorage.removeItem(itemKey);
  } else {
    localStorage.setItem(itemKey, itemValue);
  }
}

export function removeLocalItem(key: string) {
  localStorage.removeItem(prefix(key));
}
