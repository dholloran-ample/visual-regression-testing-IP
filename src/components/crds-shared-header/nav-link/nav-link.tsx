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
  @Prop() handleSignOut: Function;

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
    if(this.isSignOutLink()) {
      if(typeof this.handleSignOut === 'function'){
        this.handleSignOut();
        event.preventDefault();
      }
      else {
        console.error('Function to handle sign out not provided');
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
//TODO add test for class
  render() {
    return (
      <a href={this.href || "#"} data-automation-id={this.automationId} onClick={this.onClick.bind(this)}>
        <slot />
      </a>
    );
  }
}
