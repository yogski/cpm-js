import { CPM } from '../src/index'
import { CSFInputType } from '../src/type/base'

// Data Preparation
const EMPTY_NUMBER_ARRAY = [] as Array<number>
const EMPTY_OBJ = {}
const EMPTY_STR = ''

const RAW_INPUT_COMPLETED = `item1,item3\nitem2,item3\nitem4`
const RAW_INPUT_SINGLE = `item3\nitem1\nitem2\nitem1\nitem5\nitem5\nitem4\nitem1`

const JSON_INPUT_UNIFORM = [
  { item1: 4, item2: 5, item3: 1, item4: 2 },
  { item1: 2, item2: 2, item3: 2, item4: 5 },
  { item1: 3, item2: 4, item3: 3, item4: 3 }
]
const JSON_INPUT_NONUNIFORM = [
  { item1: 4, item2: 5, item3: 1 },
  { item1: 2, item2: 2, item3: 2, item4: 5 },
  { item2: 4, item3: 3, item4: 3 }
]
const MANUAL_INPUT = [
  { name: "item1", value: 5 },
  { name: "item2", value: 9 },
  { name: "item3", value: 1 },
  { name: "item4", value: 20 },
  { name: "item5", value: 15 },
]

describe('Create CSF from raw input', () => {
  test('correct input, correct config (1)', () => {
    expect(CPM.generateCSF(RAW_INPUT_COMPLETED, {type: CSFInputType.RAW})).toMatchObject(
      [
        {"name": "item1", "weight": 0.2222222222222222}, 
        {"name": "item3", "weight": 0.2222222222222222}, 
        {"name": "item2", "weight": 0.2222222222222222}, 
        {"name": "item4", "weight": 0.3333333333333333}
      ]
    );
  })

  test('correct input, correct config (2)', () => {
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

  test('correct input, incorrect config (1)', () => {
    expect(() => { CPM.generateCSF(RAW_INPUT_COMPLETED, {type: CSFInputType.JSON}) }).toThrow(TypeError);
  })

  test('correct input, incorrect config (2)', () => {
    expect(() => { CPM.generateCSF(RAW_INPUT_SINGLE, {type: CSFInputType.JSON}) }).toThrow(TypeError);
  })

  test('handling empty array', () => {
    expect(() => { CPM.generateCSF(EMPTY_NUMBER_ARRAY, {type: CSFInputType.RAW}) }).toThrow(TypeError);
  })

  test('handling empty object', () => {
    expect(() => { CPM.generateCSF(EMPTY_OBJ, {type: CSFInputType.RAW}) }).toThrowError(Error);
  })

  test('handling empty string', () => {
    expect(CPM.generateCSF(EMPTY_STR, {type: CSFInputType.RAW})).toMatchObject([]);
  })

})

describe('Create CSF from JSON input', () => {
  test('uniform input (same keys), correct config (1)', () => {
    expect(CPM.generateCSF(JSON_INPUT_UNIFORM, {type: CSFInputType.JSON})).toMatchObject(
      [
        { "name": "item1", "weight": 0.25 },
        { "name": "item2", "weight": 0.3055555555555556 },
        { "name": "item3", "weight": 0.16666666666666666 },
        { "name": "item4", "weight": 0.2777777777777778 }
      ]
    );
  })

  test('non-uniform input (different keys), correct config (2)', () => {
    expect(CPM.generateCSF(JSON_INPUT_NONUNIFORM, {type: CSFInputType.JSON})).toMatchObject(
      [
        { "name": "item1", "weight": 0.1935483870967742 },
        { "name": "item2", "weight": 0.3548387096774194 },
        { "name": "item3", "weight": 0.1935483870967742 },
        { "name": "item4", "weight": 0.25806451612903225 }
      ]
    );
  })

  test('uniform input, incorrect config (1)', () => {
    expect(() => { CPM.generateCSF(JSON_INPUT_UNIFORM, {type: CSFInputType.RAW}) }).toThrow(TypeError);
  })

  test('non-uniform input, incorrect config (2)', () => {
    expect(() => { CPM.generateCSF(JSON_INPUT_NONUNIFORM, {type: CSFInputType.RAW}) }).toThrow(TypeError);
  })

  test('handling empty array', () => {
    expect(CPM.generateCSF(EMPTY_NUMBER_ARRAY, {type: CSFInputType.JSON})).toMatchObject([]);
  })

  test('handling empty object', () => {
    expect(() => { CPM.generateCSF(EMPTY_OBJ, {type: CSFInputType.JSON}) }).toThrowError(Error);
  })

  test('handling empty string', () => {
    expect(() => { CPM.generateCSF(EMPTY_STR, {type: CSFInputType.JSON}) }).toThrow(TypeError);  
  })

})

describe('Create CSF from manual input', () => {
  test('correct data, correct config', () => {
    expect(CPM.generateCSF(MANUAL_INPUT, {type: CSFInputType.MANUAL})).toMatchObject(
      [
        { "name": "item1", "weight": 0.1 },
        { "name": "item2", "weight": 0.18 },
        { "name": "item3", "weight": 0.02 },
        { "name": "item4", "weight": 0.4 },
        { "name": "item5", "weight": 0.3 }
      ]
    );
  })

  test('handling empty array', () => {
    expect(CPM.generateCSF(EMPTY_NUMBER_ARRAY, {type: CSFInputType.MANUAL})).toMatchObject([]);
  })

  test('handling empty object', () => {
    expect(() => { CPM.generateCSF(EMPTY_OBJ, {type: CSFInputType.MANUAL}) }).toThrowError(Error);
  })

  test('handling empty string', () => {
    expect(() => { CPM.generateCSF(EMPTY_STR, {type: CSFInputType.MANUAL}) }).toThrow(TypeError);  
  })

})