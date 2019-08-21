//Mock auth class available for use by Jest tests
export class Auth {
  constructor(config: any = {}) {
    console.log(`in mocked auth using config ${config}`);
  }

  listen(callback) { }
}