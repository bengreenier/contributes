import fs from 'fs'
import Ajv from 'ajv'

declare namespace contributes {
  
  interface INodeData {
    /**
     * Settings description
     */
    description: string,

    /**
     * Settings type
     */
    type: string,

    /**
     * Settings default value
     */
    default?: any
  }

  interface INodeSchema extends INodeData {
    /**
     * Settings name (key)
     */
    name: string
  }

  export class Contributes {
    /**
     * Creates an instance for a particular package schema
     * 
     * Note: the schema will be validated, potentially causing this to throw an Error
     * @param packagePath path to package.json
     */
    public static from (packagePath: string) : Contributes

    /**
     * The title for the contributed settings
     */
    public title : string

    /**
     * Map the contributes settings to something new (transforming the dataset) 
     * @param it iterator function
     */
    public map<T> (it: (node: INodeSchema) => T) : T

    /**
     * The data containing contributed settings
     */
    public data : INodeSchema[]

    /**
     * Validate some settings object against the schema
     * 
     * Note: this will coerce types, if possible, to match the schema
     * Note: if validation fails, this throws an Error
     * @param data settings data to validate
     */
    public validate (data?: any) : Contributes
  }
}

export = contributes.Contributes