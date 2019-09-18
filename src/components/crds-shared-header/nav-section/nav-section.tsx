import { Component, Prop, h } from '@stencil/core';
import { Logger } from '../../../shared/logger';
import { Config } from '../../../shared/config';

@Component({
  tag: 'nav-section',
  styleUrl: 'nav-section.scss',
  shadow: false
})
export class NavigationSection {
  @Prop() public sectionName: string;
  @Prop() public isActive: boolean = false;
  @Prop() public handleClick: Function;

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
    if (typeof this.handleClick === 'function') {
      this.handleClick(event, this.sectionName);
    } else {
      console.error('Function to handle nav-section click not provided');
    }
  }

  render() {
    return (
      <li>
        <a class={this.isActive ? 'is-active' : ''} data-automation-id={`sh-section-${this.sectionName}`} onClick={this.onClick.bind(this)}>
          <slot />
        </a>
      </li>
    );
  }
}
