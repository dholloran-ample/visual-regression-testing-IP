import { Component, Prop, State, Element, h, EventEmitter, Event, Listen } from '@stencil/core';
import { SET_SITE, GET_USER } from './crds-site-select.graphql';
import { Utils } from '../../shared/utils';
import toastr from 'toastr';
import { ContentBlockHandler } from '../../shared/contentBlocks/contentBlocks';
import { isAuthenticated } from '../../global/authInit';
import { HTMLStencilElement } from '@stencil/core/internal';
import { CrdsApolloService } from '../../shared/apollo';

@Component({
  tag: 'crds-site-select',
  styleUrl: 'crds-site-select.scss',
  shadow: true
})
export class CrdsSiteSelect {
  private contentBlockHandler: ContentBlockHandler;
  private analytics = window['analytics'];
  @Element() public host: HTMLStencilElement;

  @Prop() cardSiteId: number;
  @State() cookieSiteId: number;
  @State() userSite: number;

  @Event({
    eventName: 'siteSet',
    composed: true,
    bubbles: true,
    cancelable: false
  })
  siteSetEvent: EventEmitter;

  @Listen('siteSet', { target: 'document' })
  siteSetHandler(event) {
    if (isAuthenticated()) this.userSite = event.detail;
    else this.cookieSiteId = event.detail;
  }

  public async componentWillLoad() {
    this.initToastr();
    await CrdsApolloService.subscribeToApolloClient();
    this.cookieSiteId = Number(Utils.getCookie('nearestSiteId'));
    this.contentBlockHandler = new ContentBlockHandler(CrdsApolloService.apolloClient, 'my site');
    return Promise.all([isAuthenticated() ? this.getUserSite() : null, this.contentBlockHandler.getCopy()]);
  }

  public initToastr() {
    toastr.options.closeButton = true;
    toastr.options.closeHtml = '<a type="button" class="toast-close-button" role="button">×</a>';
    toastr.options.escapeHtml = false;
  }

  private setSite() {
    if (this.analytics) {
      this.analytics.track('SiteSelectUserSetSite', {
        siteID: this.cardSiteId,
        destination: isAuthenticated() ? 'profile' : 'cookie'
      });
    }
    if (isAuthenticated()) this.setUserSite();
    else this.setCookieSite();
  }

  private getUserSite(): Promise<any> {
    return CrdsApolloService.apolloClient
      .query({ query: GET_USER })
      .then(response => {
        this.userSite = response.data.user.site.id;
        return;
      })
      .catch(err => {
        this.logError(err);
      });
  }

  private setUserSite() {
    return CrdsApolloService.apolloClient
      .mutate({
        variables: { siteId: this.cardSiteId },
        mutation: SET_SITE
      })
      .then(response => {
        this.userSite = parseInt(response.data.setSite.site.id);
        toastr.success(this.contentBlockHandler.getContentBlockText('siteSelectConfirmationLoggedIn'));
        this.siteSetEvent.emit(this.cardSiteId);
      })
      .catch(err => {
        this.logError(err);
      });
  }

  private setCookieSite() {
    Utils.setCookie('nearestSiteId', this.cardSiteId, 365);
    toastr.success(this.contentBlockHandler.getContentBlockText('siteSelectConfirmationLoggedOut'));
    this.siteSetEvent.emit(this.cardSiteId);
  }

  private logError(err) {
    console.error(err);
  }

  public renderSetSiteButton() {
    return (
      <crds-button
        onClick={() => this.setSite()}
        display="link"
        text={this.contentBlockHandler.getContentBlockText('setSiteOptionText')}
      />
    );
  }

  public render() {
    if (this.userSite) return this.cardSiteId == this.userSite ? '' : this.renderSetSiteButton();
    if (this.cookieSiteId) return this.cardSiteId == Number(this.cookieSiteId) ? '' : this.renderSetSiteButton();
    return this.renderSetSiteButton(); //default in case neither is set
  }
}
