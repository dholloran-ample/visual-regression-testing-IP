import { Component, Prop } from '@stencil/core';
import Logger from '../../../shared/logger';
import Config from '../../../shared/config';

@Component({
  tag: 'nav-section',
  styleUrl: 'nav-section.scss',
  shadow: false
})
export class NavigationSection {
  @Prop() public id: string;
  @Prop({ mutable: true }) public activeSection: any;
  @Prop({ mutable: true }) private isActive: boolean;
  @Prop() private onClick: any;
  @Prop() private parent: any;

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

  private activate(e) {
    this.console.log('activate()');
    e.preventDefault();

    this.parent.navSectionSubnav(this.id);

    this.onClick(e);

    // this.activeSection = this.id;
    this.isActive = !this.isActive;
    if (this.isActive) {
      // this.add();
      // this.count++;
    } else {
      // this.remove();
      // if (this.count > 0) {
      //   this.count--;
      // }
    }
  }

  render() {
    return (
      <li>
        <a onClick={e => this.activate(e)} class={this.isActive ? 'is-active' : ''}>
          <slot />
        </a>
      </li>
    );
  }
}
