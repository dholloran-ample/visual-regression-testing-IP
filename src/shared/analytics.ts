export class Analytics {
  private analytics = window['analytics'] || {};
  private debug;
  private component;
  private user = 'not logged in';

  constructor(debug = false, component, user?){
    this.debug = debug;
    this.component = component;
    this.user = user;
  }

  setUser(user){
    this.user = user;
    this.log(`user set to ${this.user.toString()}`);
  }

  trackUrlClicked(url, data?){
    try {
      this.analytics.track("UrlClicked", {
        component: this.component.name,
        data: data,
        url: url,
        user: this.user
      })
      this.log({url, data});
    } catch {
      this.logError({url, data});
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
