import { Component, Prop, h } from '@stencil/core';
import { Logger } from '../../../shared/logger';
import { Config } from '../../../shared/config';

@Component({
  tag: 'nav-section',
  styleUrl: 'nav-section.scss',
  shadow: false
})
export class NavigationSection {
  @Prop() public slug: string;
  @Prop({ mutable: true }) public activeSection: any;
  @Prop() public isActive: boolean = false;
  @Prop() public onActivate: any;

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
        <a
          onClick={e => this.onActivate(e, this.slug)}
          data-automation-id={`sh-section-${this.slug}`}
          class={this.isActive ? 'is-active' : ''}
        >
          <slot />
        </a>
      </li>
    );
  }
}
