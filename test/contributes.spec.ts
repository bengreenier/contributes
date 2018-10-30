import contributes from '../src/index'

describe('contributes', () => {
  it('should fail bad schemas', () => {
    expect(() => {
      contributes
        .from(`${__dirname}/badfixture.package.json`)
    }).toThrow(/shorter than 1 characters/)
  })

  it('should expose title', () => {
    // gets the title
    const title = contributes
      .from(`${__dirname}/fixture.package.json`)
      .title

    expect(title).toBe('test settings')
  })

  it('should expose name', () => {
    // gets the name
    const name = contributes
      .from(`${__dirname}/fixture.package.json`)
      .name

    expect(name).toBe('test-fixture')
  })

  it('should expose version', () => {
    // gets the version
    const version = contributes
      .from(`${__dirname}/fixture.package.json`)
      .version

    expect(version).toBe('1.1.1')
  })

  it('should enumerate settings', () => {
    // enumerates all the settings
    const data = contributes
      .from(`${__dirname}/fixture.package.json`)
      .data

    expect(data).toEqual([
      {
        name: 'str',
        default: 'abc123',
        description: 'string field',
        type: 'string'
      },
      {
        name: 'num',
        default: 12,
        description: 'number field',
        type: 'number'
      }
    ])
  })

  it('should map settings', () => {

    const data = contributes
    .from(`${__dirname}/fixture.package.json`)
    .map(s => s)

    expect(data).toEqual([
      {
        name: 'str',
        default: 'abc123',
        description: 'string field',
        type: 'string'
      },
      {
        name: 'num',
        default: 12,
        description: 'number field',
        type: 'number'
      }
    ])
  })

  it('should validate settings data is ok', () => {
    const newSettings = {
      str: 'i am valid',
      num: 1337
    }

    const frozenSettings = Object.assign({}, newSettings)
    Object.freeze(frozenSettings)

    const t = contributes
      .from(`${__dirname}/fixture.package.json`)
      .validate(newSettings)

    expect(newSettings).toStrictEqual(frozenSettings)
  })

  it('should coerce basic types', () => {
    const newSettings = {
      str: 12,
      num: '1337'
    }

    const t = contributes
      .from(`${__dirname}/fixture.package.json`)
      .validate(newSettings)

    expect(newSettings).toStrictEqual({
      str: '12',
      num: 1337
    })
  })

  it('should not tolerate bad data', () => {
    const newSettings = {
      str: {
        cantCoerceToString: true
      }
    }

    expect(() => {
      contributes
        .from(`${__dirname}/fixture.package.json`)
        .validate(newSettings)
    }).toThrow(/should be string/)
  })
})
