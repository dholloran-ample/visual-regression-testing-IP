export class Analytics {
  private analytics = window['analytics'] || {};
  private debug;
  private componentName;
  private user;

  constructor(debug = false, component, user?){
    this.debug = debug;
    this.componentName = component.constructor.name;
    user ? this.user = user : 'not logged in';
  }

  track(action, payload){
    try {
      this.analytics.track(action, {
        component: this.componentName,
        data: payload,
        user: this.user
      })
      this.log({action, payload});
    } catch {
      this.logError({action, payload});
    }
  }

  logError(data) {
    console.error("Analytics error occurred: ", data);
  }

  log(data){
    if (this.debug){
      console.log(data);
    }
  }
}
