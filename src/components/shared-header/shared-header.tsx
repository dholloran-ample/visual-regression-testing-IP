import { Component, Prop } from "@stencil/core";
import dig from "object-dig";
import axios from "axios";
import Logger from "../../shared/logger";
import Config from "../../shared/config";

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
  private links: any = [];

  @Prop() src: string;

  /**
   * Fires before render...
   */
  public componentWillLoad() {
    this.console = new Logger(this.debug);
    this.config = new Config();
    this.getRecords();
  }

  /**
   * Returns total number of likes from Contentful
   */
  public getRecords() {
    this.console.log("getRecords()");
    this.links = dig(window, "CRDS", "navigation") || [];

    if (this.links.length > 0 && this.src) {
      axios.get(this.src).then(success => {
        this.links = dig(success, "data");
      });
    }
  }

  public renderSections(sections) {
    const items = [];
    for (const i in sections) {
      items.push(
        <div>
          <crds-header>{sections[i].title}</crds-header>
          {this.renderLinks(sections[i].children)}
        </div>
      );
    }
    return items;
  }

  public renderLinks(children) {
    return children.map(child => (
      <crds-link href={dig(child, "path")}>{dig(child, "title")}</crds-link>
    ));
  }

  /**
   * HTML
   */
  public render() {
    this.console.log("render()");
    return <div>{this.renderSections(this.links)}</div>;
  }
}
