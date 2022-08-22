import { Cell } from "./type/base";

export class CPM {
  
  static WeightMap(arr: Array<Cell>): Array<Cell> {
    let sum = this.sumCells(arr);
    return arr.map((cell) => { return {...cell, value: cell.value / sum} });
  }

  /**
   * map an array of numbers to its weight distribution. 
   * Total weight of all array elements equals (1)
   * @param arr array of numeric values
   */
  static WeightValues(arr: Array<number>): Array<number>{
    let sum = arr.reduce((acc, val) => (acc + val), 0);
    return arr.map((el) => el / sum);
  }

  static sumCells(arr: Array<Cell>): number {
    return arr.map((cell) => cell.value).reduce((acc, val) => (acc + val), 0);
  }

  static mapToCells(arr: Array<number>) {
    
  }
}

