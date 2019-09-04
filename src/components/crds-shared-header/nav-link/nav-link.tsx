import { Component, Prop, h } from '@stencil/core';
import { Logger } from '../../../shared/logger';
import { Config } from '../../../shared/config';

@Component({
  tag: 'nav-link',
  shadow: false
})
export class NavigationLink {
  @Prop() href: string;
  @Prop() automationId: string;
  @Prop() handleOnClick: Function;

  /**
   * Print log messages?
   */
  private debug: boolean = true;
  private console: Logger;
  private config: Config;

  public componentWillLoad() {
    this.console = new Logger(this.debug);
    this.config = new Config();
  }


  onClick(event) {
    if(typeof this.handleOnClick === 'function'){
      this.handleOnClick(event);
      event.preventDefault();
    }
    //navigates by default
    event.stopPropagation();
  }

//TODO add class?
  render() {
    return (
      <a href={this.href || "#"} data-automation-id={this.automationId} onClick={this.onClick.bind(this)}>
        <slot />
      </a>
    );
  }
}
