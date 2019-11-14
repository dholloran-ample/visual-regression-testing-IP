import { Component, Prop, State, Element, Watch, h, Listen } from '@stencil/core';
import { MySiteUser, Site } from './my-site-interface';
import { HTMLStencilElement } from '@stencil/core/internal';
import { GET_USER, GET_CLOSEST_SITE, SET_CLOSEST_SITE, SET_SITE, GET_SITES, GET_SITE_CONTENT } from './my-site.graphql';
import ApolloClient from 'apollo-client';
import marked from 'marked';

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
  private analytics = window['analytics'];
  private apolloClient: ApolloClient<{}> = null;
  private sites: Site[];
  private anywhereSite: Site = {
    id: '15',
    name: 'Anywhere',
    mapImageUrl: `https://crds-media.imgix.net/1VXQmZC7UPLJNR9QWaN00/d03bcc64b2952059590b5e9e9c7d7030/Screen_Shot_2019-10-29_at_7.24.35_PM.png?auto=format`,
    mapUrl: 'https://www.crossroads.net/live/',
    imageUrl: 'https://crds-cms-uploads.imgix.net/Uploads/anywhere-thumbnail.jpg',
    qualifiedUrl: 'https://www.crossroads.net/live/',
    openHours: null,
    serviceTimes: null,
    address: null
  };
  private nearestSite: Site;
  private arrow: HTMLElement;
  private popper: HTMLElement;
  private popperControl: any;
  private showNotification: boolean = false;
  private contentBlockHandler: ContentBlockHandler;
  private directionsUrl: string;
  private displaySite: Site;

  @Prop() authToken: string;
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
    toastr.options.closeButton = true;
    toastr.options.closeHtml = '<a type="button" class="toast-close-button" role="button">×</a>';
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
    if (this.authToken && !this.user) this.loggedInUser();
    if (this.shouldShowComponent()) {
      this.displaySite = (this.userHasSite() && this.user.site) || this.nearestSite;
      if (this.displaySite.id === '15') this.displaySite = this.anywhereSite;
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

    reference.addEventListener('click', () => {
      if (this.popperOpen) this.handlePopperClose();
      else {
        if (this.analytics) {
          this.analytics.track('MySiteClicked', {
            siteIDShown: (this.displaySite && this.displaySite.id) || this.nearestSiteID
          });
        }
        this.handlePopperOpen();
      }
    });

    document.addEventListener('click', (e: any) => {
      const path = e.composedPath(e.target);
      if (path && path.find(el => el.className === 'my-site-container')) return;
      this.handlePopperClose();
    });
  }

  public componentDidRender() {
    setTimeout(() => {
      this.host.shadowRoot.querySelector('.my-site').classList.add('fade-in');
    }, 0);
  }

  private async loggedOutUser() {
    await this.getClosestSite();
  }

  private async loggedInUser() {
    await this.getUserSites();
    if (!this.user.closestSite) {
      await this.getClosestSite();
      this.setClosestSite(this.nearestSiteID);
    } else this.promptsDisabled = true;
  }

  private handlePopperOpen() {
    this.popperOpen = true;
    this.popper.classList.add('open');
    this.arrow.classList.add('open');
    this.popperControl.scheduleUpdate();
    document.body.style.overflow = 'hidden';
  }

  private handlePopperClose() {
    this.popperOpen = false;
    this.showNotification = false;
    this.promptsDisabled = true;
    this.popper.classList.remove('open');
    this.arrow.classList.remove('open');
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
    this.nearestSiteID = this.getSiteFromCookie() || (await this.calculateClosestSite());
    await this.getSiteContent(this.nearestSiteID);
  }

  private getSiteFromCookie(): number {
    const siteId = Number(Utils.getCookie('nearestSiteId'));
    if (siteId) this.promptsDisabled = true;
    return siteId;
  }

  private calculateClosestSite(): Promise<any> {
    if (Utils.getCookie('promptedLocation') === 'true') return;
    Utils.setCookie('promptedLocation', 'true', 1);
    return this.getCurrentPosition()
      .then((position: any) => {
        if (this.analytics)
          this.analytics.track('MySiteGetLocationPermission', {
            response: 'User allowed Geolocation'
          });
        return this.apolloClient
          .query({
            variables: { lat: position.coords.latitude, lng: position.coords.longitude },
            query: GET_CLOSEST_SITE
          })
          .then(response => {
            var nearestSiteID = Number(response.data.closestSite.id);
            Utils.setCookie('nearestSiteId', nearestSiteID, 365);
            this.showNotification = true;
            return nearestSiteID;
          })
          .catch(err => {
            this.logError(err);
          });
      })
      .catch(err => {
        if (this.analytics) {
          this.analytics.track('MySiteGetLocationPermission', {
            response: err.message
          });
        }
        this.logError(err);
      });
  }

  private getSiteContent(id: number): Promise<any> {
    return this.apolloClient
      .query({
        variables: { id: Number(id) },
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
    if (this.analytics) {
      this.analytics.track('MySiteClosestSiteSet', {
        closestSiteId: id
      });
    }
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
    if (this.analytics) {
      this.analytics.track('MySiteSetUserSite', {
        siteID: siteId
      });
    }
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
    return !!this.nearestSiteID || !!this.user;
  }

  public renderPopover() {
    return (
      <div
        class="popper"
        style={{
          backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.85), rgba(0, 0, 0, 0.7), rgb(0, 0, 0, 0.97)), url(${Utils.imgixify(
            this.displaySite.imageUrl + '?auto=format'
          )}`,
          backgroundSize: `cover`,
          backgroundPosition: `center`
        }}
      >
        {this.shouldShowSignInPrompt() ? this.renderSignInPrompt() : null}
        {this.shouldShowUpdateSitePrompt() ? this.renderUpdateSitePrompt() : null}
        {this.shouldShowSetSitePrompt() ? this.renderSetSitePrompt() : null}
        {this.shouldShowSiteContent() ? this.renderSite() : null}
      </div>
    );
  }

  private renderSite() {
    return (
      <div>
        <div class="popover-content">
          <h4 class="text-left text-uppercase font-family-base-bold">
            {(this.userHasSite() && this.user.site.id) === this.displaySite.id.toString() ? 'My Site' : 'Closest Site'}
          </h4>
          <crds-image-title-cutout class="text-white"
            imageUrl={`${Utils.imgixify(this.displaySite.mapImageUrl)}?auto=format&ar=2.63&fit=crop`}
            imageHref={this.displaySite.mapUrl}
            cardTitle={this.displaySite.name}
            titleHref={this.displaySite.qualifiedUrl}
          />
          <div class="site-details">
            {this.displaySite.id === '15' ? this.renderAnywhereSiteDetails() : this.renderSiteDetails()}
            <p class="push-half-top">Not your site? <a class="text-white" href="/profile/personal">Set your preferred site.</a></p>
          </div>
          
        </div>
      </div>
    );
  }

  private renderSiteDetails() {
    return (
      <div>
        {' '}
        <div
          class="push-half-bottom"
          innerHTML={`${marked(this.displaySite.address)}`}
          onClick={() => {
            Utils.openInNewTab(this.displaySite.mapUrl);
          }}
        />
        <div>
          {this.renderServiceHours()}
          {this.renderOpenHours()}
        </div>
      </div>
    );
  }

  private renderServiceHours() {
    if(this.displaySite.serviceTimes)
      return (
        <div>
          {' '}
          <div>
            <strong>Service Times:</strong>
          </div>
          <div innerHTML={marked(this.displaySite.serviceTimes)} />
          {this.renderGetDirections()}
        </div>
      );
  }

  private renderOpenHours() {
    if (this.displaySite.openHours)
      return (
        <div class="push-half-top">
          <strong>Open Hours:</strong>
          <div innerHTML={marked(this.displaySite.openHours)} />
        </div>
      );
  }

  private renderGetDirections() {
    if (this.directionsUrl)
      return (
        <a
          class="text-white underline"
          onClick={() => {
            Utils.openInNewTab(this.directionsUrl);
          }}
        >
          Get Directions
        </a>
      );
  }

  private renderAnywhereSiteDetails() {
    return this.contentBlockHandler.getContentBlock('MySiteAnywhereDetails');
  }

  private renderUpdateSitePrompt() {
    return (
      <div class="popover-prompt">
        {this.contentBlockHandler.getContentBlock(
          this.nearestSiteID === 15 ? 'MySiteAnywherePrompt' : 'MySiteUpdatePrompt',
          {
            nearestSite: this.nearestSite.name,
            userSite: this.user.site.name
          }
        )}
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
        {this.contentBlockHandler.getContentBlock(
          this.nearestSiteID === 15 ? 'MySiteAnywhereSetSitePrompt' : 'MySiteSetSitePrompt',
          {
            nearestSite: this.nearestSite.name
          }
        )}
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
        {this.contentBlockHandler.getContentBlock(
          this.nearestSiteID === 15 ? 'MySiteAnywhereSignInPrompt' : 'MySiteSignInPrompt',
          { nearestSite: this.nearestSite.name }
        )}
        <button
          onClick={() => {
            location.href = '/profile';
          }}
          class="btn flush-sides"
        >
          Login or signup
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
          {this.popperOpen ? SvgSrc.closeIcon() : SvgSrc.locationPinIcon()}
          <div class="notification">{this.showNotification ? SvgSrc.notificationRed() : ''}</div>
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
