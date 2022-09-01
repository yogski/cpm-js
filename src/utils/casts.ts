import { BasicCell, WeightedIndicatorCell } from "../type/base";

export class Cast {
  static toCell(name: string, value: number): BasicCell {
    return {name, value}
  }  

  static arraysToCells(names: Array<string>, values: Array<number>): Array<BasicCell> {
    // deal with negative cases
    if (names.length === 0 || values.length === 0 || names.length != values.length) return [];
    
    let m = new Map();
    let res: Array<BasicCell> = [];
    for (let i=0; i<names.length; i++) {
      if (m.has(names[i])) {
        m.set(names[i], m.get(names[i]) + values[i]);
      } else {
        m.set(names[i], values[i]);
      }
    }
    m.forEach((v,k) => res.push({ name: k, value: v }))
    return res;
  }

  static arraysToWeights(names: Array<string>, values: Array<number>): Array<WeightedIndicatorCell> {
    // deal with negative cases
    if (names.length === 0 || values.length === 0 || names.length !== values.length) return [];

    let res = [] as Array<WeightedIndicatorCell>;
    let total = 0;
    let m = new Map();
    for (let i=0; i<names.length; i++) {
      if (m.has(names[i])) m.set(names[i], m.get(names[i]) + values[i])
      else m.set(names[i], values[i])
      total += values[i]
    }
    m.forEach((v,k) => res.push({ name: k, weight: v/total }))
    return res;
  }

  static rawInputToWeights(raws: string): Array<WeightedIndicatorCell> {
    let arr = this.toNestedData(raws);
    let m = new Map();
    let res: Array<WeightedIndicatorCell> = []
    arr.forEach((record) => {
      let denom = (record.length) * (record.length + 1) / 2
      record.forEach((item, idx) => {
        let listing = item.trim().toLocaleLowerCase()
        if (listing.match(/[a-z]+/g) !== null) {
          if (m.has(listing)) {
            m.set(listing, m.get(listing) + (record.length - idx) / denom)
          } else {
            m.set(listing, (record.length - idx) / denom)
          }
        }
      })
    })
    m.forEach((v, k) => res.push({ name: k, weight: v/arr.length }));
    return res;
  }

  static JSONToWeights(tabs: Array<any>): Array<WeightedIndicatorCell> {
    if (tabs.length === 0) return [];

    let totalSum = 0;
    let m = new Map();
    let res = [] as Array<WeightedIndicatorCell>;

    tabs.map((answer) => {
      Object.keys(answer).map((k) => {
        if (m.has(k)) {
          m.set(k, m.get(k) + answer[k]);
        } else {
          m.set(k, answer[k]);
        }
        totalSum += answer[k]
      })
    })

    m.forEach((v, k) => res.push({ name: k, weight: v / totalSum }));
    return res;
  }

  static ManualToWeights(tabs: Array<BasicCell>): Array<WeightedIndicatorCell> {
    return this.arraysToWeights(tabs.map((t) => t.name), tabs.map((t) => t.value));
  }

  /**
   * Convert input string to array of array. Does not deal with cleaning input string.
   * @param str input string
   * @param token1 first level tokenizer
   * @param token2 second level tokenizer
   */
  static toNestedData(str: string, token1 = '\n', token2 = ','): Array<Array<string>> {
    if (str.length === 0) return [[]]
    return str.split(token1).map((item) => item.split(token2));
  }

  static isNestedDataEmpty(nestedData: Array<Array<any>>): boolean {
    return nestedData[0][0] === undefined;
  }
}