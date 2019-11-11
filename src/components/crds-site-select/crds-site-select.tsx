import { Component, Prop, State, Element, Watch, h } from '@stencil/core';
import { SET_SITE, GET_USER } from './crds-site-select.graphql';
import { CrdsApollo } from '../../shared/apollo';
import { Utils } from '../../shared/utils';
import { ApolloClient } from 'apollo-client';
import toastr from 'toastr';
import { ContentBlockHandler } from '../../shared/contentBlocks/contentBlocks';
import { Event, EventEmitter, Listen } from '@stencil/core';

@Component({
  tag: 'crds-site-select',
  styleUrl: 'crds-site-select.scss',
  shadow: true
})
export class CrdsSiteSelect {
  public apolloClient: ApolloClient<{}>;
  private contentBlockHandler: ContentBlockHandler;

  @Prop() authToken: string;
  @Prop() cardSiteId: number;

  @State() cookieSiteId: string;
  @State() userSite: number;

  @Event({
    eventName: 'siteSet',
    composed: true,
    bubbles: true,
    cancelable: false
  })
  siteSetEvent: EventEmitter;

  @Listen('siteSet', { target: 'document' })
  siteSetHandler() {
    if (this.authToken) this.getUserSite();
    else this.cookieSiteId = Utils.getCookie('nearestSiteId');
  }

  @Watch('authToken')
  authTokenHandler(newValue: string, oldValue: string) {
    if (newValue !== oldValue) {
      this.apolloClient = CrdsApollo(newValue);
      this.getUserSite();
    }
  }

  public componentWillLoad() {
    this.apolloClient = CrdsApollo(this.authToken);
    this.contentBlockHandler = new ContentBlockHandler(this.apolloClient, 'site select');
    this.cookieSiteId = Utils.getCookie('nearestSiteId');
    var promises = [this.getUserSite(), this.contentBlockHandler.getCopy()];
    return Promise.all(promises);
  }

  private setUserSite() {
    if (this.authToken) {
      this.setMpSite();
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

  private setMpSite() {
    return this.apolloClient
      .mutate({
        variables: { siteId: this.cardSiteId },
        mutation: SET_SITE
      })
      .then(response => {
        this.userSite = parseInt(response.data.setSite.site.id);
        this.siteSetEvent.emit();
        this.toastSuccess('siteSelectConfirmationLoggedIn');
      })
      .catch(err => {
        this.logError(err);
      });
  }

  private setCookieSite() {
    Utils.setCookie('nearestSiteId', this.cardSiteId, 365);
    this.toastSuccess('siteSelectConfirmationLoggedOut');
    this.siteSetEvent.emit();
  }

  private toastSuccess(slugName) {
    toastr.success(this.contentBlockHandler.getContentBlockText(slugName));
  }

  private logError(err) {
    console.error(err);
  }

  public renderUserSiteButton() {
    return <crds-primary-button color="blue" text={this.contentBlockHandler.getContentBlockText('userSiteButtonText')} />;
  }

  public renderSetSiteButton() {
    return (
      <crds-primary-button
        color="blue"
        onClick={() => this.setUserSite()}
        text={this.contentBlockHandler.getContentBlockText('setSiteOptionText')}
      />
    );
  }

  public render() {
    if (this.authToken && this.userSite) {
      return this.cardSiteId == this.userSite ? this.renderUserSiteButton() : this.renderSetSiteButton();
    } else if (this.cookieSiteId) {
      return this.cardSiteId == parseInt(this.cookieSiteId) ? this.renderUserSiteButton() : this.renderSetSiteButton();
    }
    return this.renderSetSiteButton(); //default in case neither is set
  }
}
