import { WeightedIndicatorCell, BasicCell } from "./type/base";

export class CPM {
  
  // static WeightedIndicator(arr: Array<BasicCell>): Array<WeightedIndicatorCell> {
  //   let sum = this.sumCells(arr);
  //   return arr.map((cell) => { return {...cell, value: cell.value / sum} });
  // }

  /**
   * map an array of numbers to its weight distribution. 
   * Total weight of all array elements equals (1)
   * @param arr array of numeric values
   */
  static WeightValues(arr: Array<number>): Array<number>{
    let sum = arr.reduce((acc, val) => (acc + val), 0);
    return arr.map((el) => el / sum);
  }

}

