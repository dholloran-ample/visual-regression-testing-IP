import { Component, Prop, State, Element, Watch, h, EventEmitter, Event, Listen } from '@stencil/core';
import { SET_SITE, GET_USER } from './crds-site-select.graphql';
import { Utils } from '../../shared/utils';
import { ApolloClient } from 'apollo-client';
import toastr from 'toastr';
import { ContentBlockHandler } from '../../shared/contentBlocks/contentBlocks';
import { ApolloClientService } from '../../global/apollo';
import { isAuthenticated } from '../../global/authInit';
import { HTMLStencilElement } from '@stencil/core/internal';

@Component({
  tag: 'crds-site-select',
  styleUrl: 'crds-site-select.scss',
  shadow: true
})
export class CrdsSiteSelect {
  private contentBlockHandler: ContentBlockHandler;
  private apolloClient: ApolloClient<{}>;
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
    const clientSubject = new ApolloClientService().getClient();
    var promise = new Promise(resolve => {
      clientSubject.subscribe(client => {
        this.apolloClient = client;
        this.contentBlockHandler = new ContentBlockHandler(this.apolloClient, 'site select');
        resolve(Promise.all([isAuthenticated() ? this.getUserSite() : null, this.contentBlockHandler.getCopy()]));
      });
    });

    this.cookieSiteId = Number(Utils.getCookie('nearestSiteId'));
    return promise;
  }

  private setSite() {
    console.log(isAuthenticated())
    if (isAuthenticated()) {
      this.setUserSite();
    } else {
      this.setCookieSite();
    }
  }

  private getUserSite(): Promise<any> {
    return this.apolloClient
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
    return this.apolloClient
      .mutate({
        variables: { siteId: this.cardSiteId },
        mutation: SET_SITE
      })
      .then(response => {
        this.userSite = parseInt(response.data.setSite.site.id);
        this.toastSuccess('siteSelectConfirmationLoggedIn');
        this.siteSetEvent.emit(this.cardSiteId);
      })
      .catch(err => {
        this.logError(err);
      });
  }

  private setCookieSite() {
    Utils.setCookie('nearestSiteId', this.cardSiteId, 365);
    this.toastSuccess('siteSelectConfirmationLoggedOut');
    this.siteSetEvent.emit(this.cardSiteId);
  }

  private toastSuccess(slugName) {
    toastr.success(this.contentBlockHandler.getContentBlockText(slugName));
  }

  private logError(err) {
    console.error(err);
  }

  public renderUserSiteButton() {
    return <crds-label text={this.contentBlockHandler.getContentBlockText('userSiteButtonText')} tint="default"></crds-label>;
  }

  public renderSetSiteButton() {
    return (
      <crds-primary-button
        color="blue"
        onClick={() => this.setSite()}
        text={this.contentBlockHandler.getContentBlockText('setSiteOptionText')}
      />
    );
  }

  public render() {
    if (this.userSite) {
      return this.cardSiteId == this.userSite ? this.renderUserSiteButton() : this.renderSetSiteButton();
    } else if (this.cookieSiteId) {
      return this.cardSiteId == Number(this.cookieSiteId) ? this.renderUserSiteButton() : this.renderSetSiteButton();
    }
    return this.renderSetSiteButton(); //default in case neither is set
  }
}
