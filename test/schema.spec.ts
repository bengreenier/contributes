import fs from 'fs'
import Ajv from 'ajv'

// load the schema and raw parser to validate the schema on it's own
const schema = JSON.parse(fs.readFileSync(`${__dirname}/../src/schema.json`).toString())
const ajv = new Ajv({ allErrors: true })
const validate = ajv.compile(schema)

describe('schema', () => {
  it('should support valid data', () => {
    let data = {
      configuration: {
        title: 'test',
        properties: {
          setting: {
            description: 'your setting',
            type: 'string',
            default: 'my setting' as any
          }
        }
      }
    }
    expect(validate(data)).toBeTruthy()

    data.configuration.properties.setting.default = 1

    expect(validate(data)).toBeTruthy()

    data.configuration.properties.setting.default = true

    expect(validate(data)).toBeTruthy()
  })

  it('should require specific object shape', () => {
    let data = {
    } as any

    expect(validate(data)).toBeFalsy()

    data.configuration = {}

    expect(validate(data)).toBeFalsy()

    data.configuration.title = 'hi'

    expect(validate(data)).toBeFalsy()

    data.configuration.properties = {}

    expect(validate(data)).toBeFalsy()

    data.configuration.properties.setting = {}

    expect(validate(data)).toBeFalsy()

    data.configuration.properties.setting.description = 'hi'

    expect(validate(data)).toBeFalsy()

    data.configuration.properties.setting.type = 'string'

    expect(validate(data)).toBeTruthy()

    data.configuration.properties.setting.default = 'data'

    expect(validate(data)).toBeTruthy()
  })

  it('should require title to be length > 0', () => {
    let data = {
      configuration: {
        title: '',
        properties: {
          setting: {
            description: 'your setting',
            type: 'string',
            default: 'my setting' as any
          }
        }
      }
    }

    expect(validate(data)).toBeFalsy()
  })

  it('should require description to be length > 0', () => {
    let data = {
      configuration: {
        title: 'hi',
        properties: {
          setting: {
            description: '',
            type: 'string',
            default: 'my setting' as any
          }
        }
      }
    }

    expect(validate(data)).toBeFalsy()
  })

  it('should disallow empty properties', () => {
    let data = {
      configuration: {
        title: 'hi',
        properties: {}
      }
    }

    expect(validate(data)).toBeFalsy()
  })

  it('should enforce type to be valid', () => {
    let data = {
      configuration: {
        title: 'hi',
        properties: {
          setting: {
            description: 'hi',
            type: 'string',
            default: 'my setting' as any
          }
        }
      }
    }

    expect(validate(data)).toBeTruthy()

    data.configuration.properties.setting.type = 'number'

    expect(validate(data)).toBeTruthy()

    data.configuration.properties.setting.type = 'object'

    expect(validate(data)).toBeTruthy()

    data.configuration.properties.setting.type = 'array'

    expect(validate(data)).toBeTruthy()

    data.configuration.properties.setting.type = 'boolean'

    expect(validate(data)).toBeTruthy()

    data.configuration.properties.setting.type = 'not-real-value'

    expect(validate(data)).toBeFalsy()
  })

  it('should not be valid with empty schema', () => {
    let data = {}

    expect(validate(data)).toBeFalsy()
  })
})
