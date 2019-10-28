import { Component, Prop, State, Element, Watch, h, Listen } from '@stencil/core';
import { MySiteUser, Site } from './my-site-interface';
import { HTMLStencilElement } from '@stencil/core/internal';
import { GET_USER, GET_CLOSEST_SITE, SET_CLOSEST_SITE, SET_SITE, GET_SITES, GET_SITE_CONTENT } from './my-site.graphql';
import ApolloClient from 'apollo-client';

import Popper from 'popper.js';
import { CrdsApollo } from '../../../../shared/apollo';
import { Utils } from '../../../../shared/utils';
import { SvgSrc } from '../../../../shared/svgSrc';
import { ContentBlockHandler } from '../../../../shared/contentBlocks/contentBlocks';
import toastr from 'toastr';

@Component({
  tag: 'my-site',
  styleUrl: 'my-site.scss',
  shadow: true
})
export class MySite {
  private apolloClient: ApolloClient<{}> = null;
  private sites: any;
  private nearestSite: Site;
  private arrow: HTMLElement;
  private popper: HTMLElement;
  private popperControl: any;
  private openPopperAutomatically: boolean = false;
  private contentBlockHandler: ContentBlockHandler;
  private directionsUrl: string;
  private displaySite: Site;
  private mutationObserver: MutationObserver;

  @Prop() authToken: string;
  @Prop() authInit: boolean;
  @State() user: MySiteUser = null;
  @State() nearestSiteID: number;
  @State() promptsDisabled: boolean = false;
  @State() popperOpen: boolean = false;
  @Element() public host: HTMLStencilElement;

  @Watch('authToken')
  authTokenHandler(newValue: string, oldValue: string) {
    if (newValue !== oldValue) {
      this.apolloClient = CrdsApollo(newValue);
    }
  }

  public componentWillLoad() {
    this.promptsDisabled = Utils.getCookie('disableMySitePrompts') === 'true';
    toastr.options.escapeHtml = false;
    this.apolloClient = CrdsApollo(this.authToken);
    this.contentBlockHandler = new ContentBlockHandler(this.apolloClient, 'my site');
    var promises = [
      this.getSites(),
      this.contentBlockHandler.getCopy(),
      this.authToken ? this.loggedInUser() : this.loggedOutUser()
    ];

    return Promise.all(promises);
  }

  public async componentWillRender() {
    if (this.authToken && !this.user) await this.loggedInUser();
    if (this.shouldShowComponent()) {
      this.displaySite = (this.userHasSite() && this.user.site) || this.nearestSite;
      return this.getDirectionsUrl(this.displaySite);
    }
  }

  public componentDidLoad() {
    var reference = this.host.shadowRoot.querySelector('.my-site');
    this.popper = this.host.shadowRoot.querySelector('.popper');
    this.arrow = this.host.shadowRoot.querySelector('.arrow');
    if (!reference || !this.popper) return;
    this.popperControl = new Popper(reference, this.popper, {
      placement: 'bottom',
      modifiers: {
        offset: {
          offset: '20px',
          enabled: true
        }
      }
    });

    if (this.openPopperAutomatically) {
      this.handlePopperOpen();
      const mySiteContainerEl: any = this.host.parentElement;
      mySiteContainerEl.click();
      this.openPopperAutomatically = false;
    }

    reference.addEventListener('click', () => {
      if (this.popperOpen) this.handlePopperClose();
      else this.handlePopperOpen();
    });

    document.addEventListener('click', (e: any) => {
      const path = e.composedPath(e.target);
      if (path && path.find(el => el.className === 'my-site-container')) return;
      this.handlePopperClose();
    });

    window.addEventListener('resize', () => this.addTextCutout());
  }

  public componentDidRender() {
    if (this.shouldShowSiteContent()) setTimeout(() => this.addTextCutout(), 100);
  }

  private async loggedOutUser() {
    await this.getClosestSite();
  }

  private async loggedInUser() {
    await this.getUserSites();
    if (!this.user.closestSite) {
      await this.getClosestSite();
      this.setClosestSite(this.nearestSiteID);
    }
  }

  private handlePopperOpen() {
    this.popperOpen = true;
    this.popper.classList.add('open');
    this.arrow.classList.add('open');
    this.popperControl.scheduleUpdate();
    document.body.style.overflow = 'hidden';
    this.addTextCutout();
  }

  private handlePopperClose() {
    this.popperOpen = false;
    this.popper.classList.remove('open');
    this.arrow.classList.remove('open');
  }

  private addTextCutout() {
    if (!this.host) return;
    const siteNameEl: any = this.host.shadowRoot.querySelector('.site-name-overlap');
    const mapImageEl: any = this.host.shadowRoot.querySelector('.map-image');
    if (!siteNameEl || !mapImageEl) return;

    const siteNamePos = siteNameEl.getBoundingClientRect();
    const mapImagePos = mapImageEl.getBoundingClientRect();
    const siteNameXPaddingAndMargin = 10;
    const cutOutMaxX = 16 + siteNamePos.width - siteNameXPaddingAndMargin + 1;
    const cutOutMinX = 16 - siteNameXPaddingAndMargin;
    const cutOutMaxY = mapImagePos.height - 0.5 * siteNamePos.height;
    mapImageEl.style.WebkitClipPath = `polygon(0 0, 100% 0, 100% 100%, ${cutOutMaxX}px 100%, ${cutOutMaxX}px ${cutOutMaxY}px, ${cutOutMinX}px ${cutOutMaxY}px, ${cutOutMinX}px 100%, 0 100%)`;
  }

  private logError(err) {
    console.error(err);
  }

  private disablePrompts(): void {
    this.handlePopperClose();
    this.promptsDisabled = true;
    Utils.setCookie('disableMySitePrompts', 'true', 365);
  }

  private getUserSites(): Promise<any> {
    return this.apolloClient
      .query({ query: GET_USER })
      .then(response => {
        this.user = response.data.user;
        if (this.user.closestSite) {
          this.nearestSite = this.user.closestSite;
          this.promptsDisabled = true;
        }
        this.nearestSiteID = Number(this.user.closestSite.id);
        return;
      })
      .catch(err => {
        this.logError(err);
      });
  }

  private getSites(): Promise<any> {
    return this.apolloClient
      .query({ query: GET_SITES })
      .then(response => {
        this.sites = response.data.sites;
        return;
      })
      .catch(err => {
        this.logError(err);
      });
  }

  private async getClosestSite(): Promise<any> {
    this.nearestSiteID = Number(Utils.getCookie('nearestSiteId'));
    if (this.nearestSiteID) this.promptsDisabled = true;
    else await this.calculateClosestSite();
    await this.getSiteContent(this.nearestSiteID);
  }

  private calculateClosestSite(): Promise<any> {
    if (Utils.getCookie('promptedLocation') === 'true') return;
    Utils.setCookie('promptedLocation', 'true', 1);
    return this.getCurrentPosition()
      .then((position: any) => {
        return this.apolloClient
          .query({
            variables: { lat: position.coords.latitude, lng: position.coords.longitude },
            query: GET_CLOSEST_SITE
          })
          .then(response => {
            this.nearestSiteID = response.data.closestSite.id;
            Utils.setCookie('nearestSiteId', this.nearestSiteID, 365);
            this.openPopperAutomatically = true;
            return this.nearestSiteID;
          })
          .catch(err => {
            this.logError(err);
          });
      })
      .catch(err => {
        this.logError(err);
      });
  }

  private getSiteContent(id: number): Promise<any> {
    return this.apolloClient
      .query({
        variables: { id: id },
        query: GET_SITE_CONTENT
      })
      .then(response => {
        return (this.nearestSite = response.data.site);
      })
      .catch(err => {
        this.logError(err);
      });
  }

  private setClosestSite(id: number): Promise<any> {
    return this.apolloClient
      .mutate({
        variables: { closestSiteID: id },
        mutation: SET_CLOSEST_SITE
      })
      .then(response => {
        return response.data.closestSite.id;
      })
      .catch(err => {
        this.logError(err);
      });
  }

  private setUserSite(siteId) {
    this.handlePopperClose();
    return this.apolloClient
      .mutate({
        variables: { siteId: siteId },
        mutation: SET_SITE
      })
      .then(response => {
        this.user = { ...this.user, site: response.data.setSite.site };
        toastr.success(
          `<div>
            You've set ${this.user.site.name} as the preferred site for you and your household. 
            <a href="/profile/personal">Update your profile</a> to cancel or change your site.
          </div>`
        );
      })
      .catch(err => {
        this.logError(err);
      });
  }

  private getCurrentPosition() {
    return new Promise((resolve, reject) => {
      navigator.geolocation.getCurrentPosition(resolve, reject);
    });
  }

  private userHasSite() {
    if (!this.user || !this.user.site) return false;
    return (
      this.user.site.name !== 'Not site specific' &&
      this.user.site.name !== 'I do not attend Crossroads' &&
      this.user.site.name !== ''
    );
  }

  private getDirectionsUrl(siteContent: Site): Promise<string> {
    return this.getCurrentPosition().then((position: any) => {
      return (this.directionsUrl = siteContent.mapUrl.replace(
        '/place/',
        `/dir/${position.coords.latitude},${position.coords.longitude}/`
      ));
    });
  }

  private openInNewTab(url) {
    const win = window.open(url, '_blank');
    win.focus();
  }

  private shouldShowUpdateSitePrompt(): boolean {
    return this.userHasSite() && this.nearestSiteID !== Number(this.user.site.id) && !this.promptsDisabled;
  }

  private shouldShowSetSitePrompt(): boolean {
    return this.user && !this.userHasSite() && !this.promptsDisabled;
  }

  private shouldShowSignInPrompt(): boolean {
    return this.nearestSiteID && !this.authToken && !this.promptsDisabled;
  }

  private shouldShowSiteContent(): boolean {
    return (
      (!this.shouldShowUpdateSitePrompt() &&
        !this.shouldShowSignInPrompt() &&
        !this.shouldShowSetSitePrompt() &&
        !!this.nearestSiteID) ||
      (this.userHasSite() && this.promptsDisabled)
    );
  }

  private shouldShowComponent(): boolean {
    return (this.authInit && !!this.nearestSiteID) || !!this.user;
  }

  public renderPopover() {
    return (
      <div
        class="popper"
        style={{
          backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.85), rgba(0, 0, 0, 0.5), rgb(0, 0, 0, 0.85)), url(${Utils.imgixify(
            this.displaySite.imageUrl + '?auto=format'
          )}`,
          backgroundSize: `cover`,
          backgroundColor: this.displaySite.imageUrl ? null : `lightgrey`
        }}
      >
        {this.shouldShowSignInPrompt() ? this.renderSignInPrompt() : null}
        {this.shouldShowUpdateSitePrompt() ? this.renderUpdateSitePrompt() : null}
        {this.shouldShowSetSitePrompt() ? this.renderSetSitePrompt() : null}
        {this.shouldShowSiteContent() ? this.renderSiteDetails() : null}
      </div>
    );
  }

  private renderSiteDetails() {
    if (this.displaySite.id == '15') return this.renderAnywhereSiteContent();
    return (
      <div class="popover-content">
        <h4 class="text-left text-uppercase">
          {(this.userHasSite() && this.user.site.id) === this.displaySite.id.toString() ? 'My Site' : 'Closest Site'}
        </h4>
        <img
          class="map-image"
          src={Utils.imgixify(this.displaySite.mapImageUrl + '?auto=format')}
          onClick={() => {
            this.openInNewTab(this.displaySite.mapUrl);
          }}
        />
        <div class="card-block text-left">
          <a href={this.displaySite.qualifiedUrl} class="text-white text-uppercase site-name-overlap">
            {this.displaySite.name}
          </a>
          <div
            class="push-half-bottom"
            innerHTML={`${this.displaySite.address}`}
            onClick={() => {
              this.openInNewTab(this.displaySite.mapUrl);
            }}
          />
          <div>
            <div>
              <strong>Service Times:</strong>
            </div>
            <div innerHTML={this.displaySite.serviceTimes} />
            <a
              class="text-white underline"
              onClick={() => {
                this.openInNewTab(this.directionsUrl);
              }}
            >
              Get Directions
            </a>
          </div>
          <div class="push-half-top">
            <strong>Open Hours:</strong>
            <div innerHTML={this.displaySite.openHours} />
          </div>

          <p class="push-half-top">
            Not your site?{' '}
            <a class="text-white" href="/profile/personal">
              {' '}
              Set your preferred site.
            </a>
          </p>
        </div>
      </div>
    );
  }

  private renderAnywhereSiteContent() {
    return (
      <div class="popover-content anywhere">
        {this.contentBlockHandler.getContentBlock('MySiteAnywhereContent', { nearestSite: this.nearestSite.name })}
      </div>
    );
  }

  private renderAnywhereSiteUpdatePrompt() {
    return (
      <div class="popover-prompt">
        {this.contentBlockHandler.getContentBlock('MySiteAnywherePrompt', {
          userSite: this.displaySite.name
        })}
        <button class="btn" onClick={() => this.setUserSite(this.nearestSiteID)}>
          Update My Site
        </button>
        <a onClick={() => this.disablePrompts()}>No, thanks</a>
      </div>
    );
  }

  private renderUpdateSitePrompt() {
    if (this.nearestSite.id === '15') return this.renderAnywhereSiteUpdatePrompt();
    return (
      <div class="popover-prompt">
        {this.contentBlockHandler.getContentBlock('MySiteUpdatePrompt', {
          nearestSite: this.nearestSite.name,
          userSite: this.user.site.name
        })}
        <button class="btn" onClick={() => this.setUserSite(this.nearestSiteID)}>
          Update My Site
        </button>
        <a onClick={() => this.disablePrompts()}>No, thanks</a>
      </div>
    );
  }

  private renderSetSitePrompt() {
    return (
      <div class="popover-prompt">
        {this.contentBlockHandler.getContentBlock('MySiteSetSitePrompt', {
          nearestSite: this.nearestSite.name
        })}
        <button class="btn" onClick={() => this.setUserSite(this.nearestSiteID)}>
          Make it my preferred site
        </button>
        <a onClick={() => this.disablePrompts()}>No, thanks</a>
      </div>
    );
  }

  private renderSignInPrompt() {
    return (
      <div class="popover-prompt">
        {this.contentBlockHandler.getContentBlock('MySiteSignInPrompt', { nearestSite: this.nearestSite.name })}
        <button
          onClick={() => {
            location.href = '/signin';
          }}
          class="btn flush-sides"
        >
          Login
        </button>
        <a onClick={() => this.disablePrompts()}>No, thanks</a>
      </div>
    );
  }

  public render() {
    if (!this.shouldShowComponent()) return null;
    return (
      <div class="arrow">
        <div class={`my-site ${this.popperOpen ? 'open' : ''}`}>
          {this.popperOpen ? SvgSrc.closeIcon() : SvgSrc.locationPinIcon()}{' '}
          <a class="my-site-name">
            {(this.userHasSite() && this.user.site.name) ||
              this.sites.find(site => Number(site.id) === this.nearestSiteID).name}
          </a>
        </div>
        {this.renderPopover()}
      </div>
    );
  }
}
