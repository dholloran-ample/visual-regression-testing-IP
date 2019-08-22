//Mock auth class available for use by Jest tests
export class Auth {
  config: any;

  constructor(config: any = {}) {
    this.config = config;
  }

  listen(callback) {
    const fake = callback; //Needed to keep the storybook from complaining
  }
}