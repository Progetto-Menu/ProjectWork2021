export class JSONUtils{
    static getProperty(json:Object, property:string, def:any) : any {
        return json != null && json.hasOwnProperty(property) ? Object.getOwnPropertyDescriptor(json, property)?.value : def;
    }
}