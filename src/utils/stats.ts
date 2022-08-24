export function sum(arr: Array<number>): number {
  return arr.reduce((acc, v) => (acc + v), 0);
}

export function avg(arr: Array<number>): number {
  return sum(arr) / arr.length;
}