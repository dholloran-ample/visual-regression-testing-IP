import { Component, Prop, State, Element, Watch, h } from '@stencil/core';
import { SET_SITE, GET_USER } from './crds-site-select.graphql';
import { CrdsApollo } from '../../shared/apollo';
import { Utils } from '../../shared/utils';
import { ApolloClient } from 'apollo-client';
import toastr from 'toastr';
import { ContentBlockHandler } from '../../shared/contentBlocks/contentBlocks';
import { SiteSelectUser } from './crds-site-select.interface';
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
  @Prop() cardSiteId: string;

  @State() cookieSiteId: string;
  @State() user: SiteSelectUser;

  @Event({
    eventName: 'siteSet',
    composed: true,
    bubbles: true,
    cancelable: true
  }) siteSetEvent: EventEmitter

  @Listen('siteSet', { target: 'document'})
  siteSetHandler(){
    console.log("listener hit");
    if(this.authToken) this.getUserSite();
    this.cookieSiteId = Utils.getCookie('nearestSiteId');
  }

  @Watch('authToken')
  authTokenHandler(newValue: string, oldValue: string) {
    if (newValue !== oldValue) {
      this.apolloClient = CrdsApollo(newValue);
      this.getUserSite();
    }
  }

  public componentWillLoad() {
    toastr.options.escapeHtml = false;
    this.apolloClient = CrdsApollo(this.authToken);
    this.contentBlockHandler = new ContentBlockHandler(this.apolloClient, 'site select');
    this.cookieSiteId = Utils.getCookie('nearestSiteId');
    var promises = [this.getUserSite(), this.contentBlockHandler.getCopy()]
    return Promise.all(promises);
  }

  private getUserSite(): Promise<any> {
    return this.apolloClient
      .query({ query: GET_USER })
      .then(response => {
        this.user = response.data.user;
        return;
      })
      .catch(err => {
        this.logError(err);
      });
  }

  private setUserSite() {
    if (this.authToken) {
      this.setMpSite();
    }
    else {
      this.setCookieSite();
    }
    this.siteSetEvent.emit();
  }

  private setMpSite() {
    return this.apolloClient
      .mutate({
        variables: { siteId: this.cardSiteId },
        mutation: SET_SITE
      })
      .then(() => {
        toastr.success(
          this.contentBlockHandler.getContentBlock('siteSelectConfirmation')
        );
      })
      .catch(err => {
        this.logError(err);
      });
  }

  private setCookieSite() {
    Utils.setCookie('nearestSiteId', this.cardSiteId, 365);
  }

  private logError(err) {
    console.error(err)
  }

  public renderUserSiteButton() {
    return (
      <button>{this.contentBlockHandler.getContentBlock('userSiteButtonText')}</button >
    )
  }

  public renderSetSiteButton() {
    return (
      <button onClick={() => this.setUserSite()}>{this.contentBlockHandler.getContentBlock('setSiteOptionText')}</button >
    )
  }

  public render() {
    if(this.authToken) {
      return this.cardSiteId == this.user.site.id ? this.renderUserSiteButton() : this.renderSetSiteButton();
    } else {
      return this.cardSiteId == this.cookieSiteId ? this.renderUserSiteButton() : this.renderSetSiteButton();
    }
  }

}
