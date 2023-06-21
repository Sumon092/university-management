const pick = <T extends Record<string, unknown>, K extends keyof T>(
  obj: T,
  keys: K[]
) => {
  const finalObj: Partial<T> = {};
  for (const key of keys) {
    if (obj && Object.prototype.hasOwnProperty.call(obj, key)) {
      finalObj[key] = obj[key] as T[K];
    }
  }
  return finalObj;
};
export default pick;
