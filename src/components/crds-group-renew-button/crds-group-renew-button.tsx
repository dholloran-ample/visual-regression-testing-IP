import { Component, Prop, h, State } from '@stencil/core';
import { CrdsApolloService } from '../../shared/apollo';
import { ContentBlockHandler } from '../../shared/contentBlocks/contentBlocks';
import { isAuthenticated } from '../../global/authInit';
import toastr from 'toastr';
import { SET_GROUP_END_DATE, GET_USER_GROUPS } from './crds-group-renew-button.graphql';

@Component({
  tag: 'crds-group-renew-button',
  shadow: true
})
export class CrdsGroupRenew {
  private contentBlockHandler: ContentBlockHandler;
  private newEndDate: Date;
  private groupNames: string[];

  @Prop() groupId: number;
  @Prop() daysToExpiration: number;
  @State() userLedGroups: any[];

  private logError(err) {
    console.error(err);
  }

  public async componentWillLoad() {
    this.initToastr();
    await CrdsApolloService.subscribeToApolloClient();
    this.contentBlockHandler = new ContentBlockHandler(CrdsApolloService.apolloClient, 'group renew');
    var promises: Promise<any>[] = [this.contentBlockHandler.getCopy()];
    if (isAuthenticated() && this.groupId && this.daysToExpiration) promises.push(this.getUserGroups());
    return Promise.all(promises);
  }

  public initToastr() {
    toastr.options.closeButton = true;
    toastr.options.closeHtml = '<a type="button" class="toast-close-button" role="button">×</a>';
    toastr.options.escapeHtml = false;
  }

  private getUserGroups() {
    return CrdsApolloService.apolloClient
      .query({ query: GET_USER_GROUPS })
      .then(success => {
        this.userLedGroups = success.data.user.groups;
        return;
      })
      .catch(err => {
        this.logError(err);
      });
  }

  private setGroupEndDate() {
    return CrdsApolloService.apolloClient
      .mutate({
        variables: { ids: [this.groupId], endDate: this.getExpirationDate(this.daysToExpiration) },
        mutation: SET_GROUP_END_DATE
      })
      .then(response => {
        var date = new Date(0);
        date.setTime((response.data.setGroupsEndDate[0].endDate + date.getTimezoneOffset() * 60) * 1000);
        this.newEndDate = date;
        this.groupNames = response.data.setGroupsEndDate.map(group => group.name);
      })
      .catch(err => {
        this.logError(err);
      });
  }

  private getExpirationDate(days: number): number {
    var date = new Date();
    date.setDate(date.getDate() + days);
    return Math.floor(date.getTime() / 1000);
  }

  private async handleButtonClicked() {
    await this.setGroupEndDate();
    if (this.newEndDate && this.groupNames)
      toastr.success(
        this.contentBlockHandler.getContentBlockText('group-end-date-renew-success', {
          groupNames: this.groupNames.join(', '),
          endDate: this.newEndDate.toLocaleDateString()
        })
      );
    else toastr.error(this.contentBlockHandler.getContentBlockText('group-end-date-renew-failure'));
  }

  public render() {
    if ((!isAuthenticated() && !this.userLedGroups.find(group => Number(group.id) == this.groupId)) || !this.groupId)
      return '';
    return (
      <crds-button color="white" text="Renew group" display="outline" onClick={() => this.handleButtonClicked()} />
    );
  }
}
