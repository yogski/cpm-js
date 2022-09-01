import { CPM } from '../src/index'
import { CSFInputType } from '../src/type/base'

// Data Preparation
const EMPTY_NUMBER_ARRAY = [] as Array<number>
const EMPTY_OBJ = {}
const EMPTY_STR = ''
const RAW_INPUT_COMPLETED = `item1,item3\nitem2,item3\nitem4`
const RAW_INPUT_SINGLE = `item3\nitem1\nitem2\nitem1\nitem5\nitem5\nitem4\nitem1`

describe('Test CSF (Critical Success Factors) functions', () => {
  test('Create CSF from raw input -- correct input, correct config (1)', () => {
    expect(CPM.generateCSF(RAW_INPUT_COMPLETED, {type: CSFInputType.RAW})).toMatchObject(
      [
        {"name": "item1", "weight": 0.2222222222222222}, 
        {"name": "item3", "weight": 0.2222222222222222}, 
        {"name": "item2", "weight": 0.2222222222222222}, 
        {"name": "item4", "weight": 0.3333333333333333}
      ]
    );
  })

  test('Create CSF from raw input -- correct input, correct config (2)', () => {
    expect(CPM.generateCSF(RAW_INPUT_SINGLE, {type: CSFInputType.RAW})).toMatchObject(
      [
        {"name": "item3", "weight": 0.125}, 
        {"name": "item1", "weight": 0.375}, 
        {"name": "item2", "weight": 0.125}, 
        {"name": "item5", "weight": 0.25}, 
        {"name": "item4", "weight": 0.125}
      ]
    );
  })

  test('Create CSF from raw input -- correct input, incorrect config (1)', () => {
    expect(() => { CPM.generateCSF(RAW_INPUT_COMPLETED, {type: CSFInputType.JSON}) }).toThrow(TypeError);
  })

  test('Create CSF from raw input -- correct input, incorrect config (2)', () => {
    expect(() => { CPM.generateCSF(RAW_INPUT_SINGLE, {type: CSFInputType.JSON}) }).toThrow(TypeError);
  })

  test('Create CSF from raw input -- handling empty array', () => {
    expect(() => { CPM.generateCSF(EMPTY_NUMBER_ARRAY, {type: CSFInputType.RAW}) }).toThrow(TypeError);
  })

  test('Create CSF from raw input -- handling empty object', () => {
    expect(() => { CPM.generateCSF(EMPTY_OBJ, {type: CSFInputType.RAW}) }).toThrowError(Error);
  })

  test('Create CSF from raw input -- handling empty string', () => {
    expect(CPM.generateCSF(EMPTY_STR, {type: CSFInputType.RAW})).toMatchObject([]);
  })

})