import { Component, Prop } from '@stencil/core';
import { Logger } from '../../../shared/logger';
import { Config } from '../../../shared/config';

@Component({
  tag: 'nav-section',
  styleUrl: 'nav-section.scss',
  shadow: false
})
export class NavigationSection {
  @Prop() public id: string;
  @Prop({ mutable: true }) public activeSection: any;
  @Prop() isActive: boolean = false;
  @Prop() private onActivate: any;

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

  render() {
    return (
      <li>
        <a onClick={e => this.onActivate(e, this.id)} class={this.isActive ? 'is-active' : ''}>
          <slot />
        </a>
      </li>
    );
  }
}
