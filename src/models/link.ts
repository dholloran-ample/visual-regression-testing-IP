export default class Link {
  // private title: String;
  // private path: String;

  constructor(obj: any) {
    Object.keys(obj.fields).forEach(key => {
      this[key] = obj.fields[key];
    });
    return this;
  }
}
