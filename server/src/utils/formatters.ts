const camelToSnakeCase = (str: string) =>
  str.replace(/[A-Z]/g, (letter) => `_${letter.toLowerCase()}`);

export const convertToSnakeCase = (obj: any): any => {
  if (Array.isArray(obj)) {
    return obj.map((v) => convertToSnakeCase(v));
  } else if (obj !== null && obj.constructor === Object) {
    return Object.keys(obj).reduce((acc, key) => {
      const newKey = camelToSnakeCase(key);
      acc[newKey] = convertToSnakeCase(obj[key]);
      return acc;
    }, {} as any);
  }
  return obj;
};
