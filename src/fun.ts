export const iIsOdd = (i: number) => i % 2 === 1

export const idFromUrlVar = (str: string, key: string) => str.match(new RegExp("(?<=" + key + "=)(.*?)(?=&|\\))"))[1];
