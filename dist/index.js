"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = __importDefault(require("fs"));
const ajv_1 = __importDefault(require("ajv"));
// load the schema and raw parser to validate the schema on it's own
const schema = JSON.parse(fs_1.default.readFileSync(`${__dirname}/../src/schema.json`).toString());
class Contributes {
    static from(packagePath) {
        return new Contributes(packagePath);
    }
    constructor(packagePath) {
        this._ajv = new ajv_1.default({ allErrors: true, useDefaults: true, coerceTypes: true });
        const pkgSchemaValidator = this._ajv.compile(schema);
        this._pkg = JSON.parse(fs_1.default.readFileSync(packagePath).toString());
        const pkgSchema = this._pkg.contributes;
        // your contributes is no bueno
        if (!pkgSchemaValidator(pkgSchema)) {
            throw new Error(this._ajv.errorsText(pkgSchemaValidator.errors));
        }
        this._schema = Object.assign({}, pkgSchema.configuration, { type: 'object' });
        this._validator = this._ajv.compile(this._schema);
    }
    get name() {
        return this._pkg.name;
    }
    get version() {
        return this._pkg.version;
    }
    get title() {
        return this._schema.title;
    }
    map(it) {
        return this.data
            .map(it);
    }
    get data() {
        return Object.keys(this._schema.properties)
            .map(key => ({ key: key, data: this._schema.properties[key] }))
            .map(raw => (Object.assign({}, raw.data, { name: raw.key })));
    }
    validate(data) {
        if (!this._validator(data)) {
            throw new Error(this._ajv.errorsText(this._validator.errors));
        }
        return this;
    }
}
exports.default = Contributes;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9zcmMvaW5kZXgudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFBQSw0Q0FBbUI7QUFDbkIsOENBQXFCO0FBRXJCLG9FQUFvRTtBQUNwRSxNQUFNLE1BQU0sR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLFlBQUUsQ0FBQyxZQUFZLENBQUMsR0FBRyxTQUFTLHFCQUFxQixDQUFDLENBQUMsUUFBUSxFQUFFLENBQUMsQ0FBQTtBQTZCeEYsTUFBcUIsV0FBVztJQUN2QixNQUFNLENBQUMsSUFBSSxDQUFFLFdBQW1CO1FBQ3JDLE9BQU8sSUFBSSxXQUFXLENBQUMsV0FBVyxDQUFDLENBQUE7SUFDckMsQ0FBQztJQU9ELFlBQXFCLFdBQW1CO1FBQ3RDLElBQUksQ0FBQyxJQUFJLEdBQUcsSUFBSSxhQUFHLENBQUMsRUFBRSxTQUFTLEVBQUUsSUFBSSxFQUFFLFdBQVcsRUFBRSxJQUFJLEVBQUUsV0FBVyxFQUFFLElBQUksRUFBRSxDQUFDLENBQUE7UUFFOUUsTUFBTSxrQkFBa0IsR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUMsQ0FBQTtRQUVwRCxJQUFJLENBQUMsSUFBSSxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsWUFBRSxDQUFDLFlBQVksQ0FBQyxXQUFXLENBQUMsQ0FBQyxRQUFRLEVBQUUsQ0FBUyxDQUFBO1FBRXZFLE1BQU0sU0FBUyxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFBO1FBRXZDLCtCQUErQjtRQUMvQixJQUFJLENBQUMsa0JBQWtCLENBQUMsU0FBUyxDQUFDLEVBQUU7WUFDbEMsTUFBTSxJQUFJLEtBQUssQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxrQkFBa0IsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFBO1NBQ2pFO1FBRUQsSUFBSSxDQUFDLE9BQU8scUJBQVEsU0FBUyxDQUFDLGFBQWEsSUFBRSxJQUFJLEVBQUUsUUFBUSxHQUFFLENBQUE7UUFDN0QsSUFBSSxDQUFDLFVBQVUsR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUE7SUFDbkQsQ0FBQztJQUVELElBQVcsSUFBSTtRQUNiLE9BQU8sSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUE7SUFDdkIsQ0FBQztJQUVELElBQVcsT0FBTztRQUNoQixPQUFPLElBQUksQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFBO0lBQzFCLENBQUM7SUFFRCxJQUFXLEtBQUs7UUFDZCxPQUFPLElBQUksQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFBO0lBQzNCLENBQUM7SUFFTSxHQUFHLENBQUssRUFBNEI7UUFDekMsT0FBTyxJQUFJLENBQUMsSUFBSTthQUNiLEdBQUcsQ0FBQyxFQUFFLENBQUMsQ0FBQTtJQUNaLENBQUM7SUFFRCxJQUFXLElBQUk7UUFDYixPQUFPLE1BQU0sQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxVQUFVLENBQUM7YUFDeEMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsQ0FBQyxFQUFFLEdBQUcsRUFBRSxHQUFHLEVBQUUsSUFBSSxFQUFFLElBQUksQ0FBQyxPQUFPLENBQUMsVUFBVSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsQ0FBQzthQUM5RCxHQUFHLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxtQkFBTSxHQUFHLENBQUMsSUFBSSxJQUFFLElBQUksRUFBRSxHQUFHLENBQUMsR0FBRyxJQUFHLENBQUMsQ0FBQTtJQUNqRCxDQUFDO0lBRU0sUUFBUSxDQUFFLElBQVU7UUFDekIsSUFBSSxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLEVBQUU7WUFDMUIsTUFBTSxJQUFJLEtBQUssQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUE7U0FDOUQ7UUFDRCxPQUFPLElBQUksQ0FBQTtJQUNiLENBQUM7Q0FDRjtBQXpERCw4QkF5REMifQ==