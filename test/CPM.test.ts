import { CPM } from '../src/index'
import { CSFInputType } from '../src/type/base'

// Data Preparation
const EMPTY_ARRAY = []
const EMPTY_OBJ = {}
const EMPTY_STR = ''
const RAW_INPUT_COMPLETED = `item1,item3\nitem2,item3\nitem4`
const RAW_INPUT_SINGLE = `item3\nitem1\nitem2\nitem1\nitem5\nitem5\nitem4\nitem1`

describe('Test CSF (Critical Success Factors) functions', () => {
  test('Create CSF from raw input -- correct input, correct config (1)', () => {
    console.log(CPM.generateCSF(RAW_INPUT_COMPLETED, {type: CSFInputType.RAW}))
    expect(CPM.generateCSF(RAW_INPUT_COMPLETED, {type: CSFInputType.RAW})).toReturn();
  })

  test('Create CSF from raw input -- correct input, correct config (2)', () => {
    console.log(CPM.generateCSF(RAW_INPUT_SINGLE, {type: CSFInputType.RAW}))
    expect(CPM.generateCSF(RAW_INPUT_SINGLE, {type: CSFInputType.RAW})).toReturn();
  })

  test('Create CSF from raw input -- correct input, incorrect config (1)', () => {
    expect(CPM.generateCSF(RAW_INPUT_COMPLETED, {type: CSFInputType.JSON})).toThrow(Error);
  })

  test('Create CSF from raw input -- correct input, incorrect config (1)', () => {
    expect(CPM.generateCSF(RAW_INPUT_SINGLE, {type: CSFInputType.JSON})).toThrow(Error);
  })

  test('Create CSF from raw input -- handling empty array', () => {
    expect(CPM.generateCSF(EMPTY_ARRAY, {type: CSFInputType.RAW})).toThrow(Error);
  })

  test('Create CSF from raw input -- handling empty object', () => {
    expect(CPM.generateCSF(EMPTY_OBJ, {type: CSFInputType.RAW})).toThrow(Error);
  })

  test('Create CSF from raw input -- handling empty string', () => {
    expect(CPM.generateCSF(EMPTY_STR, {type: CSFInputType.RAW})).toThrow(Error);
  })

})