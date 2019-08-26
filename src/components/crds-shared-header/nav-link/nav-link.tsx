import { Component, Prop, Event, EventEmitter, h } from '@stencil/core';
import { Logger } from '../../../shared/logger';
import { Config } from '../../../shared/config';
//TODO update components
@Component({
  tag: 'nav-link',
  shadow: false
})
export class NavigationLink {
  /**
   * Print log messages?
   */
  private debug: boolean = true; //TODO is anything being done with this?
  private console: Logger;
  private config: Config;

  @Prop() href: string;
  @Prop() automationId: string;
  @Prop() handleSignOut: Function;

  public componentWillLoad() {
    this.console = new Logger(this.debug);
    this.config = new Config();
  }

  onClick(event) {
    console.log('DEBUG Handling click in nav-link');
    if(this.isSignOutLink()) {
      if(typeof this.handleSignOut === 'function'){
        this.handleSignOut();
        event.preventDefault();
      }
    }
    else {
      window.location.href = this.href;
      event.stopPropagation();
    }
  }

  isSignOutLink(){
    return this.automationId === 'sh-sign-out';
  }

  render() {
    return (
      <a href={this.href} data-automation-id={this.automationId} onClick={this.onClick.bind(this)}>
        <slot />
      </a>
    );
  }
}
