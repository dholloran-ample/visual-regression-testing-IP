import { Component } from "@stencil/core";
// import { Component, Prop, State } from "@stencil/core";
// import dig from "object-dig";

import axios from "axios";
import Logger from "../../shared/logger";
import Config from "../../shared/config";
import Link from "../../models/link";

@Component({
  tag: "shared-header",
  styleUrl: "shared-header.scss",
  shadow: true
})
export class SharedHeader {
  /**
   * Print log messages?
   */
  private debug: boolean = true;
  private console: Logger;
  private config: Config;
  private links: Array<Link>;

  /**
   * Fires before render...
   */
  public componentWillLoad() {
    this.console = new Logger(this.debug);
    this.config = new Config();
    this.links = this.getRecords();
  }

  /**
   * Returns total number of likes from Contentful
   */
  public getRecords() {
    this.console.log("getCount()");
    return axios
      .get(`${this.config.endpoint()}/entries`, {
        params: {
          content_type: "navigation",
          access_token: this.config.token()
        }
      })
      .then(success => {
        // let items = dig(success, "data", "items");

        // this.console.log(
        //   items.forEach(el => {
        //     return new Link(el);
        //   })
        // );
        // this.console.log(items, "zz");
        return []; //items.forEach(el => new Link(el));
      });
  }

  /**
   * HTML
   */
  public render() {
    this.console.log("render()");
    return <div>{this.config.endpoint()}</div>;
  }
}
