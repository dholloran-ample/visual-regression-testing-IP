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
  private debug: boolean = true;
  private console: Logger;
  private config: Config;

  public componentWillLoad() {
    this.console = new Logger(this.debug);
    this.config = new Config();
  }

  @Prop() href: string;
  @Prop() automationId: string;
  @Event({
    eventName: 'signOutClicked',
    bubbles: true
  })
  signOutClicked: EventEmitter;

  onClick(link: NavigationLink) {
    if (this.automationId === 'sh-sign-out') {
      this.signOutClicked.emit(link);
    } else {
      window.location.href = this.href;
    }
  }

  render() {
    return (
      <a href={this.href} data-automation-id={this.automationId} onClick={this.onClick.bind(this, this)}>
        <slot />
      </a>
    );
  }
}
