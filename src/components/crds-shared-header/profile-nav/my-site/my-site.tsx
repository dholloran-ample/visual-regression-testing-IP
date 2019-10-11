import { Component, Prop, State, Element, Watch, h } from '@stencil/core';
import { MySiteUser, Site } from './my-site-interface';
import { HTMLStencilElement } from '@stencil/core/internal';
import { GET_USER, GET_CLOSEST_SITE, SET_CLOSEST_SITE, SET_SITE, GET_SITES, GET_SITE_CONTENT } from './my-site.graphql';
import ApolloClient from 'apollo-client';

import Popper from 'popper.js';
import { CrdsApollo } from '../../../../shared/apollo';
import { Utils } from '../../../../shared/utils';
import { SvgSrc } from '../../../../shared/svgSrc';
import { findValuesAddedToEnums } from 'graphql/utilities/findBreakingChanges';
import { ContentBlockHandler } from '../../../../shared/contentBlocks/contentBlocks';

@Component({
  tag: 'my-site',
  styleUrl: 'my-site.scss',
  shadow: true
})
export class MySite {
  private apolloClient: ApolloClient<{}> = null;
  private user: MySiteUser = null;
  private sites: any;
  private nearestSiteContent: Site;
  private popper: HTMLElement;
  private openPopperAutomatically: boolean = false;
  private contentBlockHandler: ContentBlockHandler;

  @Prop() authToken: string;
  @Prop() defaultName: string;
  @State() nearestSiteID: number;
  @State() promptsDisabled: boolean = false;
  @Element() public host: HTMLStencilElement;

  @Watch('authToken')
  authTokenHandler(newValue: string, oldValue: string) {
    if (newValue !== oldValue) {
      this.apolloClient = CrdsApollo(newValue);
    }
  }

  public componentWillLoad() {
    this.promptsDisabled = Utils.getCookie('disableMySitePrompts') === 'true';
    this.apolloClient = CrdsApollo(this.authToken);
    this.contentBlockHandler = new ContentBlockHandler(this.apolloClient, 'my site');
    var promises = [this.getSites(), this.contentBlockHandler.getCopy()];
    if (!this.authToken) promises.push(this.loggedOutUser());
    else promises.push(this.loggedInUser());
    return Promise.all(promises);
  }

  public componentWillRender() {
    console.log('will rerender');
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

  private getUserSites(): Promise<any> {
    return this.apolloClient
      .query({ query: GET_USER })
      .then(response => {
        this.user = response.data.user;
        if (this.user.closestSite) this.nearestSiteContent = this.user.closestSite;
        this.nearestSiteID = Number(this.user.closestSite.id);
        return;
      })
      .catch(err => {
        this.logError(err);
      });
  }

  public componentDidRender() {
    var reference = this.host.shadowRoot.querySelector('.my-site');
    this.popper = this.host.shadowRoot.querySelector('.my-popper');
    if (!reference || !this.popper) return;
    var popperInstance = new Popper(reference, this.popper, {
      placement: 'bottom'
    });

    if (this.openPopperAutomatically) {
      this.popper.classList.add('open');
      this.openPopperAutomatically = false;
    }

    reference.addEventListener('click', () => {
      this.popper.classList.add('open');
    });
  }

  private handlePopperClose() {
    this.popper.classList.remove('open');
  }

  /** Stencil Personalization Components Defaults **/
  // This lets unit tests capture and confirm errors rather than listening in on console.error
  private logError(err) {
    console.error(err);
  }

  private disablePrompts(): void {
    //save this to the users personalization profile too????
    this.promptsDisabled = true;
    Utils.setCookie('disableMySitePrompts', 'true', 365);
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
    this.nearestSiteID = Number(Utils.getCookie('nearestSiteId') || (await this.calculateClosestSite()));
    await this.getSiteContent(this.nearestSiteID);
  }

  private calculateClosestSite(): Promise<any> {
    //uncomment when done testing.
    // if (Utils.getCookie('promptedLocation') === 'true') return;
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
        return (this.nearestSiteContent = response.data.site);
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
    return this.apolloClient
      .mutate({
        variables: { siteId: siteId },
        mutation: SET_SITE
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

  public renderPopover() {
    return (
      <div class="my-popper">
        {this.shouldShowSiteContent() ? this.renderSiteDetails() : null}
        {this.shouldShowSignInPrompt() ? this.renderSignInPrompt() : null}
        {this.shouldShowUpdateSitePrompt() ? this.renderUpdateSitePrompt() : null}
      </div>
    );
  }

  private shouldShowUpdateSitePrompt(): boolean {
    return (
      this.user &&
      this.nearestSiteID !== (this.user && this.user.site && Number(this.user.site.id)) &&
      !this.promptsDisabled
    );
  }

  private shouldShowSignInPrompt(): boolean {
    return this.nearestSiteID && !this.authToken && !this.promptsDisabled;
  }

  private shouldShowSiteContent(): boolean {
    return (
      (!this.shouldShowUpdateSitePrompt() && !this.shouldShowSignInPrompt() && !!this.nearestSiteID) 
      || (this.user && this.user.site && this.promptsDisabled) 
    );
  }

  private shouldShowComponent(): boolean {
    return !!this.nearestSiteID || !!this.user;
  }

  private renderSiteDetails() {
    var siteContent = this.user && this.user.site || this.nearestSiteContent;
    return (
      <div class="popover-content">
        <button type="button" class="close" aria-label="Close" onClick={() => this.handlePopperClose()} />
        <h4>
          {(this.user && this.user.site && this.user.site.id) === this.nearestSiteID.toString()
            ? 'My Site'
            : 'Closest Site'}
        </h4>
        <div
          class="map-image"
          style={{
            backgroundImage: `url(${Utils.imgixify(siteContent.mapImageUrl + '?auto=format')}`
          }}
        >
          <h4>{siteContent.name}</h4>
        </div>

        <div innerHTML={siteContent.address} />
        <div>
          <div>Service Times</div>
          <div innerHTML={siteContent.serviceTimes} />
        </div>
        <div>
          <div>Open Hours</div>
          <div innerHTML={siteContent.openHours} />
        </div>
        <div>Not your perferred site? Set your preferred site.</div>
      </div>
    );
  }

  private renderUpdateSitePrompt() {
    return (
      <div>
        <p>UPDATE SITE PROMPT</p>
        <button onClick={() => this.setUserSite(this.nearestSiteID)}>Update My Site</button>
        <a onClick={() => this.disablePrompts()}>No, thanks</a>
      </div>
    );
  }

  private renderSignInPrompt() {
    return (
      <div class="popover-content">
        <p>{this.contentBlockHandler.getContentBlock('MySiteSignInPrompt', { site: this.nearestSiteContent.name })}</p>
        <button
          onClick={() => {
            location.href = '/signin';
          }}
          class="btn"
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
      <div>
        <div class="my-site">
          {SvgSrc.locationPinIcon()}{' '}
          <a class="my-site-name">{this.user && this.user.site && this.user.site.name || this.sites.find(site => Number(site.id) === this.nearestSiteID).name}</a>
        </div>
        {this.renderPopover()}
      </div>
    );
  }
}
