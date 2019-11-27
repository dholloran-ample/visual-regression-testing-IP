import { Component, Prop, h } from '@stencil/core';
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
  private groupName: string;

  @Prop() groupId: number;
  @Prop() daysToExpiration: number;

  private logError(err) {
    console.error(err);
  }

  public async componentWillLoad() {
    await CrdsApolloService.subscribeToApolloClient();
    this.contentBlockHandler = new ContentBlockHandler(CrdsApolloService.apolloClient, 'group renew');
    var promises: Promise<any>[] = [this.contentBlockHandler.getCopy()];
    this.groupId = Number(new URLSearchParams(document.location.search).get("groupId"));
    if (isAuthenticated() && this.groupId && this.daysToExpiration) promises.push(this.setGroupEndDate());
    return Promise.all(promises);
  }

  private setGroupEndDate() {
    return CrdsApolloService.apolloClient
      .mutate({
        variables: { ids: [this.groupId], endDate: this.getExpirationDate(this.daysToExpiration) },
        mutation: SET_GROUP_END_DATE
      })
      .then(response => {
        var date = new Date(0);
        date.setTime(response.data.setGroupsEndDate[0].endDate * 1000);
        this.newEndDate = date;
        this.groupName = response.data.setGroupsEndDate[0].name;
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
    if (this.newEndDate && this.groupName)
      return this.contentBlockHandler.getContentBlock('group-end-date-renew-success', {
        groupName: this.groupName,
        endDate: this.newEndDate.toLocaleDateString()
      });
    return this.contentBlockHandler.getContentBlock('group-end-date-renew-failure');
  }
}
