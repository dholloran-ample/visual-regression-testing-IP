import { Component, Prop, h, State } from '@stencil/core';
import { CrdsApolloService } from '../../shared/apollo';
import { ContentBlockHandler } from '../../shared/contentBlocks/contentBlocks';
import { SET_GROUP_END_DATE } from './crds-group-renew.graphql';
import { isAuthenticated } from '../../global/authInit';

@Component({
  tag: 'crds-group-renew',
  shadow: true
})
export class CrdsGroupRenew {
  private contentBlockHandler: ContentBlockHandler;
  private newEndDate: Date;
  private groupNames: string[];

  @State() groupIds: number[];
  @Prop() groupIdsString: string;
  @Prop() daysToExpiration: number;

  private logError(err) {
    console.error(err);
  }

  public async componentWillLoad() {
    await CrdsApolloService.subscribeToApolloClient();
    this.contentBlockHandler = new ContentBlockHandler(CrdsApolloService.apolloClient, 'group renew');
    var promises: Promise<any>[] = [this.contentBlockHandler.getCopy()];
    if (!this.groupIdsString)
      this.groupIds = new URLSearchParams(document.location.search)
        .get('groupIds')
        .split(',')
        .map(groupId => {
          return Number(groupId);
        });
    else this.groupIds = this.groupIdsString.split(',').map(id => Number(id));
    if (isAuthenticated() && this.groupIds && this.daysToExpiration) promises.push(this.setGroupEndDate());
    return Promise.all(promises);
  }

  private setGroupEndDate() {
    return CrdsApolloService.apolloClient
      .mutate({
        variables: { ids: this.groupIds, endDate: this.getExpirationDate(this.daysToExpiration) },
        mutation: SET_GROUP_END_DATE
      })
      .then(response => {
        var date = new Date(0);
        date.setTime((response.data.setGroupsEndDate[0].endDate + date.getTimezoneOffset() * 60) * 1000);
        this.newEndDate = date;
        this.groupNames = response.data.setGroupsEndDate.map(group => group.name);
        return;
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

  public render() {
    if (!isAuthenticated()) return '';
    if (this.newEndDate && this.groupNames)
      return this.contentBlockHandler.getContentBlock('group-end-date-renew-success', {
        groupNames: this.groupNames.join(', '),
        endDate: this.newEndDate.toLocaleDateString()
      });
    return this.contentBlockHandler.getContentBlock('group-end-date-renew-failure');
  }
}
