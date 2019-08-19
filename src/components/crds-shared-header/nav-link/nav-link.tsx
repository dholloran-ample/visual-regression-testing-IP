import { Component, Prop, Event, EventEmitter, h } from '@stencil/core';
import { Logger } from '../../../shared/logger';
import { Config } from '../../../shared/config';

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
  @Event({
    eventName: 'signOutClicked',
    bubbles: true
  })
  signOutClicked: EventEmitter;

  public componentWillLoad() {
    this.console = new Logger(this.debug);
    this.config = new Config();
  }

  onClick() {
    if (this.automationId === 'sh-sign-out') { //TODO I'm not liking the automation id's used for this (though it is guaranteed...)
      this.signOutClicked.emit(this);
    } else {
      window.location.href = this.href;
    }
  }

  render() {
    return (
      <a href={this.href} data-automation-id={this.automationId} onClick={this.onClick.bind(this)}>
        <slot />
      </a>
    );
  }
}
