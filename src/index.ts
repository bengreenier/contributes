import fs from 'fs'
import Ajv from 'ajv'

// load the schema and raw parser to validate the schema on it's own
const schema = JSON.parse(fs.readFileSync(`${__dirname}/../src/schema.json`).toString())

interface INodeData {
  description: string,
  type: string,
  default?: any
}

interface INodeSchema extends INodeData {
  name: string
}

interface IPartialSchema {
  title: string,
  properties: { [key: string]: INodeData }
}

interface ISchema extends IPartialSchema {
  type: string,
}

interface IPkg {
  name: string,
  version: string,
  contributes: {
    configuration: IPartialSchema
  }
}

export default class Contributes {
  public static from (packagePath: string) {
    return new Contributes(packagePath)
  }

  private _ajv: Ajv.Ajv
  private _pkg: IPkg
  private _schema: ISchema
  private _validator: Ajv.ValidateFunction

  private constructor (packagePath: string) {
    this._ajv = new Ajv({ allErrors: true, useDefaults: true, coerceTypes: true })

    const pkgSchemaValidator = this._ajv.compile(schema)

    this._pkg = JSON.parse(fs.readFileSync(packagePath).toString()) as IPkg

    const pkgSchema = this._pkg.contributes

    // if we don't have a schema, just mock out one (don't error)
    if (!pkgSchema) {
      this._schema = { type: 'object', properties: {} } as any
      this._validator = () => { return true }
    } else {

      // your contributes is no bueno
      if (!pkgSchemaValidator(pkgSchema)) {
        throw new Error(this._ajv.errorsText(pkgSchemaValidator.errors))
      }

      this._schema = { ...pkgSchema.configuration, type: 'object' }
      this._validator = this._ajv.compile(this._schema)
    }
  }

  public get name () {
    return this._pkg.name
  }

  public get version () {
    return this._pkg.version
  }

  public get title () {
    return this._schema.title
  }

  public map<T> (it: (node: INodeSchema) => T) {
    return this.data
      .map(it)
  }

  public get data () {
    return Object.keys(this._schema.properties)
      .map(key => ({ key: key, data: this._schema.properties[key] }))
      .map(raw => ({ ...raw.data, name: raw.key }))
  }

  public validate (data?: any) {
    if (!this._validator(data)) {
      throw new Error(this._ajv.errorsText(this._validator.errors))
    }
    return this
  }
}
