import { Component, Prop, h } from '@stencil/core';
import { SimpleNavHelper } from '../profile-nav/simple-nav-helper';

@Component({
  tag: 'nav-section-subnav',
  styleUrl: 'nav-section-subnav.scss',
  shadow: false
})
export class NavSectionSubnav {
  @Prop() public subNavName: string;
  @Prop() public isActive: boolean = false;
  @Prop() public handleBackClick: Function;
  @Prop() public data: any = {};

  private simpleNav: SimpleNavHelper;

  constructor() {
    this.simpleNav = new SimpleNavHelper();
    this.simpleNav.formatMenuEntry = (element) => {return element}; //Don't add extra formatting to entries
  }

  onClick(event) {
    if (typeof this.handleBackClick === 'function') {
      this.handleBackClick(event);
    } else {
      console.error('Function to handle nav-section-subnav click not provided');
    }
  }

  render() {
    let chevronLeftLight =
      '<svg aria-hidden="true" focusable="false" data-prefix="fal" data-icon="chevron-left" class="svg-inline--fa fa-chevron-left fa-w-8" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 512"><path fill="currentColor" d="M238.475 475.535l7.071-7.07c4.686-4.686 4.686-12.284 0-16.971L50.053 256 245.546 60.506c4.686-4.686 4.686-12.284 0-16.971l-7.071-7.07c-4.686-4.686-12.284-4.686-16.97 0L10.454 247.515c-4.686 4.686-4.686 12.284 0 16.971l211.051 211.05c4.686 4.686 12.284 4.686 16.97-.001z"></path></svg>';

    return (
      <div class={this.isActive ? '' : 'hidden'} >
        <a data-automation-id={`sh-section-subnav-${this.subNavName}`} class="back" href="" onClick={event => this.handleBackClick(event)}>
          <span innerHTML={chevronLeftLight} />
          Back
        </a>
        {this.simpleNav.formatMenuTitle(this.data.title)}
        {this.simpleNav.maybeRenderNavEntries(this.data.children)}
      </div>
    );
  }
}
