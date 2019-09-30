import { Component, Prop, Listen, h } from '@stencil/core';
import { SimpleNavHelper } from './simple-nav-helper';

@Component({
  tag: 'give-nav',
  styleUrl: 'profile-nav.scss',
  shadow: true
})
export class GiveMenu {
  @Prop() isNavShowing: boolean = true;
  @Prop() data: any = {};
  private simpleNav: SimpleNavHelper;

  constructor() {
    this.simpleNav = new SimpleNavHelper();
  }

  private navTitle() {
    return (this.data && this.data.title) || '';
  }

  private backgroundImageURL(data) {
    return data.background_img || '';
  }

  render() {
    if (!this.isNavShowing || !this.simpleNav.isObjectTruthyNonArray(this.data)) return null;

    return (
      <div class="give-nav" style={{ backgroundImage: `url(${this.backgroundImageURL(this.data)})` }}>
        {this.simpleNav.renderNav(this.data, this.navTitle())}
      </div>
    );
  }
}