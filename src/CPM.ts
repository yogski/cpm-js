import { WeightedIndicatorCell, BasicCell, CSFCell, ProfileInput, CSFConfig } from "./type/base";
import { Cast } from "./utils/casts";

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

  /**
   * Generate weighted Critical Success Factor data based on input. Support raw string, tabulated data in JSON, and manual data
   * @param source data source
   * @param config including: type (raw, table, manual)
   */
  static generateCSF(source: any, config: CSFConfig): CSFCell {
    switch (config.type) {

      case "raw":
        if (typeof source !== "string") throw new Error(`String input expected, receiving ${typeof source}.`);
        return Cast.rawInputToWeights(source);

      case "json":
        if (typeof source !== "object") throw new Error(`Object input expected, receiving ${typeof source}.`)
        return Cast.JSONToWeights(source);

      case "manual":
        if (typeof source !== "object") throw new Error(`Object input expected, receiving ${typeof source}.`);
        return Cast.ManualToWeights(source);

      default:
        throw new Error ("Unsupported data.");
    }
  }

  static buildCPM(CSF: CSFCell, ...elementInput: Array<number>) {

  }

  static generateProfileInput(CSF: CSFCell): ProfileInput {
    return CSF.map((f) => { return { name: f.name, value: 0 } })
  }

}

