import { Component, Prop, State, h, Listen, Element } from '@stencil/core';
import Fragment from '../../../shared/fragment';

import { Auth } from '../../../shared/auth';
import { Utils } from '../../../shared/utils';
import * as iconData from './global-nav-icons.json';
import { HTMLStencilElement } from '@stencil/core/internal';

@Component({
  tag: 'global-nav',
  styleUrl: 'global-nav.scss',
  shadow: true
})
export class GlobalNav {
  @Prop() env: string;
  @Prop() data: any = {};

  @State() openNavName: string = '';
  @State() isAuthenticated: boolean = false;
  @State() topOffset: number;
  @Element() public host: HTMLStencilElement;

  private element: HTMLElement;

  auth: any = {};
  preventClose: boolean;

  componentWillLoad() {
    if (!this.data.config || this.auth.config) return;
    this.auth = new Auth(Object.assign(this.data.config, { env: this.env }));
    this.auth.listen(this.authChangeCallback.bind(this), this.authAttemptedCallback.bind(this));
  }

  componentDidLoad() {
    this.topOffset = this.element.getBoundingClientRect().top + window.scrollY;
  }

  /* Handle authentication */
  handleSignOut() {
    this.auth.signOut(this.authChangeCallback.bind(this), this.authAttemptedCallback.bind(this));
  }

  authAttemptedCallback() {
    this.host.shadowRoot.querySelector('my-site').setAttribute('auth-init', 'true');
  }

  authChangeCallback() {
    this.isAuthenticated = this.auth.authenticated;
    this.host.shadowRoot && this.host.shadowRoot.querySelector('my-site').setAttribute('auth-token', this.auth.token && this.auth.token.access_token.accessToken);
    if (!this.isAuthenticated) {
      this.redirectToRoot();
    }
  }

  redirectToRoot() {
    window.location.replace(this.rootURL());
  }

  /* Handle nav open/close */
  isNavOpen() {
    const navNames = ['main-nav', 'my-site', 'give-nav', 'profile-nav'];
    return navNames.includes(this.openNavName);
  }

  toggleNav(event, navName, navRequiresAuth: boolean = false) {
    const path = event.composedPath && event.composedPath(event.target);
    if (path && path.find(el => el.className == 'popper open')) return (this.preventClose = true);
    if (this.openNavName === navName) {
      event.preventDefault();
      this.openNavName = '';
    } else if (navRequiresAuth) {
      if (this.isAuthenticated) {
        event.preventDefault();
        this.openNavName = navName;
      }
    } else {
      event.preventDefault();
      this.openNavName = navName;
    }
    this.preventClose = true;
    const docStyle = this.isNavOpen() ? 'overflow: hidden; position: absolute; width: 100vw;' : 'overflow: scroll;';
    document.body.setAttribute('style', docStyle);
  }

  @Listen('click', { target: 'window' })
  closeNav(event) {
    const path = event.composedPath && event.composedPath(event.target);
    if (path && path.find(el => el.className === this.openNavName)) return;
    if (this.preventClose) return (this.preventClose = false);
    if (this.isNavOpen()) {
      event.preventDefault();
    }

    this.openNavName = '';
    document.body.setAttribute('style', 'overflow: scroll;');
  }

  /* Misc */
  rootURL() {
    return `https://${Utils.getSubdomain(this.env)}.crossroads.net`;
  }

  authProfileIcon() {
    const avatarUrl = this.auth.currentUser && this.auth.currentUser.avatarUrl;
    return `<div class="account-authenticated" style="background-image: url('${avatarUrl || ''}');"/>`;
  }

  /* Render elements */
  render() {
    return (
      <Fragment>
        <header
          ref={el => (this.element = el)}
          class={this.isNavOpen() ? 'nav-is-showing' : ''}
          style={{
            top: `${this.openNavName === 'profile-nav' || this.openNavName === 'give-nav' ? this.topOffset : 0}px`
          }}
        >
          <div>
            <div class="global-nav-items">
              <div class="global-actions">
                <a
                  class={`menu-container ${this.openNavName === 'main-nav' ? 'nav-is-showing' : ''}`}
                  onClick={event => this.toggleNav(event, 'main-nav')}
                  data-label="menu"
                  data-automation-id="sh-menu"
                >
                  <div class={iconData.main.class} innerHTML={iconData.main.innerHTML} />
                  <div class={iconData.close.class} innerHTML={iconData.close.innerHTML} />
                </a>
                <a
                  href={`${this.rootURL()}/search`}
                  class="search-container"
                  data-automation-id="sh-search"
                  data-label="search"
                >
                  <div class={iconData.search.class} innerHTML={iconData.search.innerHTML} />
                </a>
              </div>

              <a
                href={this.rootURL()}
                data-automation-id="sh-logo"
                class={iconData.logo.class}
                innerHTML={iconData.logo.innerHTML}
              />

              <div class="user-actions">
                <a
                  class="my-site-container"
                  onClick={event => this.toggleNav(event, 'my-site')}
                  data-automation-id="sh-my-site"
                >
                <my-site auth-token auth-init="false"></my-site>
                </a>

                <a
                  class={`give-container ${this.openNavName === 'give-nav' ? 'nav-is-showing' : ''}`}
                  onClick={event => this.toggleNav(event, 'give-nav')}
                  data-label="give"
                  data-automation-id="sh-give"
                >
                  <div class={iconData.give.class} innerHTML={iconData.give.innerHTML} />
                  <div class={iconData.close.class} innerHTML={iconData.close.innerHTML} />
                </a>

                <a
                  class={`profile-container ${this.openNavName === 'profile-nav' ? 'nav-is-showing' : ''}`}
                  onClick={event => this.toggleNav(event, 'profile-nav', true)}
                  data-label={this.isAuthenticated ? 'my account' : 'sign in'}
                  href={`${this.rootURL()}/signin`}
                  data-automation-id="sh-profile"
                >
                  <div
                    class={iconData.profile.class}
                    innerHTML={this.isAuthenticated ? this.authProfileIcon() : iconData.profile.innerHTML}
                  />
                  <div class={iconData.close.class} innerHTML={iconData.close.innerHTML} />
                </a>
              </div>
            </div>

            <give-nav isNavShowing={this.openNavName === 'give-nav'} data={(this.data as any).give} />
            <profile-nav
              isNavShowing={this.openNavName === 'profile-nav' && this.isAuthenticated}
              handleSignOut={this.handleSignOut.bind(this)}
              currentUser={this.auth.currentUser}
              data={this.data.profile}
            />
          </div>
        </header>
        <main-nav isNavShowing={this.openNavName === 'main-nav'} data={this.data.nav} promoData={this.data.promos} />

        <div class={`close-nav ${this.isNavOpen() ? 'is-showing' : ''}`}>
          <div class="close-nav-icon" innerHTML={iconData.close.innerHTML} onClick={this.closeNav.bind(this)} />
        </div>
      </Fragment>
    );
  }
}
