const typedKeys = <T extends Record<string, unknown>>(obj: T): (keyof T)[] => {
  return Object.keys(obj) as (keyof T)[];
};

const typedValues = <T extends Record<string, unknown>>(
  obj: T,
): T[keyof T][] => {
  return Object.values(obj) as T[keyof T][];
};

const typedEntries = <T extends Record<string, unknown>>(
  obj: T,
): [keyof T, T[keyof T][]][] => {
  return Object.entries(obj) as [keyof T, T[keyof T][]][];
};

export { typedKeys, typedValues, typedEntries };
