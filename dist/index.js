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
        const pkgSchema = JSON.parse(fs_1.default.readFileSync(packagePath).toString()).contributes;
        // your contributes is no bueno
        if (!pkgSchemaValidator(pkgSchema)) {
            throw new Error(this._ajv.errorsText(pkgSchemaValidator.errors));
        }
        this._schema = Object.assign({}, pkgSchema.configuration, { type: 'object' });
        this._validator = this._ajv.compile(this._schema);
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
exports.Contributes = Contributes;
exports.default = Contributes;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9zcmMvaW5kZXgudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFBQSw0Q0FBbUI7QUFDbkIsOENBQXFCO0FBRXJCLG9FQUFvRTtBQUNwRSxNQUFNLE1BQU0sR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLFlBQUUsQ0FBQyxZQUFZLENBQUMsR0FBRyxTQUFTLHFCQUFxQixDQUFDLENBQUMsUUFBUSxFQUFFLENBQUMsQ0FBQTtBQWtCeEYsTUFBYSxXQUFXO0lBQ2YsTUFBTSxDQUFDLElBQUksQ0FBRSxXQUFtQjtRQUNyQyxPQUFPLElBQUksV0FBVyxDQUFDLFdBQVcsQ0FBQyxDQUFBO0lBQ3JDLENBQUM7SUFNRCxZQUFxQixXQUFtQjtRQUN0QyxJQUFJLENBQUMsSUFBSSxHQUFHLElBQUksYUFBRyxDQUFDLEVBQUUsU0FBUyxFQUFFLElBQUksRUFBRSxXQUFXLEVBQUUsSUFBSSxFQUFFLFdBQVcsRUFBRSxJQUFJLEVBQUUsQ0FBQyxDQUFBO1FBRTlFLE1BQU0sa0JBQWtCLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDLENBQUE7UUFDcEQsTUFBTSxTQUFTLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxZQUFFLENBQUMsWUFBWSxDQUFDLFdBQVcsQ0FBQyxDQUFDLFFBQVEsRUFBRSxDQUFDLENBQUMsV0FBVyxDQUFBO1FBRWpGLCtCQUErQjtRQUMvQixJQUFJLENBQUMsa0JBQWtCLENBQUMsU0FBUyxDQUFDLEVBQUU7WUFDbEMsTUFBTSxJQUFJLEtBQUssQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxrQkFBa0IsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFBO1NBQ2pFO1FBRUQsSUFBSSxDQUFDLE9BQU8scUJBQVEsU0FBUyxDQUFDLGFBQWEsSUFBRSxJQUFJLEVBQUUsUUFBUSxHQUFFLENBQUE7UUFDN0QsSUFBSSxDQUFDLFVBQVUsR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUE7SUFDbkQsQ0FBQztJQUVELElBQVcsS0FBSztRQUNkLE9BQU8sSUFBSSxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUE7SUFDM0IsQ0FBQztJQUVNLEdBQUcsQ0FBSyxFQUE0QjtRQUN6QyxPQUFPLElBQUksQ0FBQyxJQUFJO2FBQ2IsR0FBRyxDQUFDLEVBQUUsQ0FBQyxDQUFBO0lBQ1osQ0FBQztJQUVELElBQVcsSUFBSTtRQUNiLE9BQU8sTUFBTSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLFVBQVUsQ0FBQzthQUN4QyxHQUFHLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxDQUFDLEVBQUUsR0FBRyxFQUFFLEdBQUcsRUFBRSxJQUFJLEVBQUUsSUFBSSxDQUFDLE9BQU8sQ0FBQyxVQUFVLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxDQUFDO2FBQzlELEdBQUcsQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLG1CQUFNLEdBQUcsQ0FBQyxJQUFJLElBQUUsSUFBSSxFQUFFLEdBQUcsQ0FBQyxHQUFHLElBQUcsQ0FBQyxDQUFBO0lBQ2pELENBQUM7SUFFTSxRQUFRLENBQUUsSUFBVTtRQUN6QixJQUFJLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsRUFBRTtZQUMxQixNQUFNLElBQUksS0FBSyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQTtTQUM5RDtRQUNELE9BQU8sSUFBSSxDQUFBO0lBQ2IsQ0FBQztDQUNGO0FBN0NELGtDQTZDQztBQUVELGtCQUFlLFdBQVcsQ0FBQSJ9