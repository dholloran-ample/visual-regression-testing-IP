import { Component, Prop, h } from '@stencil/core';
import { SimpleNavHelper } from './simple-nav-helper';

@Component({
  tag: 'profile-nav',
  styleUrl: 'profile-nav.scss',
  shadow: true
})
export class ProfileMenu {
  @Prop() isNavShowing: boolean = true;
  @Prop() data: any = {};
  @Prop() currentUser: any;
  @Prop() handleSignOut: Function;
  private simpleNav: SimpleNavHelper;

  constructor() {
    this.simpleNav = new SimpleNavHelper(this.handleSignOut);
  }

  private navTitle() {
    const title = (this.data && this.data.title) || '';
    return unescape(title.replace('%user_name%', this.currentUser.name || ''));
  }

  private backgroundImageURL() {
    return (this.currentUser && this.currentUser.avatarUrl) || '';
  }

  render() {
    if (!this.isNavShowing || !this.simpleNav.isObjectTruthyNonArray(this.data)) return null;

    return (
      <div class="profile-nav">
        <div
          class="profile-nav-img"
          style={{
            backgroundImage: `linear-gradient(0deg, rgba(2,0,36,1) 0%, rgba(0,0,0,1) 30%, rgba(0,0,0,0) 100%),url('${
              this.backgroundImageURL()
              }')`
          }}
        />
        <div>{this.simpleNav.renderNav(this.data, this.navTitle())}</div>
      </div>
    );
  }
}