import { CrdsApolloService } from '../../shared/apollo';
import { HTMLStencilElement } from '@stencil/core/internal';
import { Component, Element, h, Prop, State } from '@stencil/core';
import { GET_GROUP_PRIVACY, SET_GROUP_PRIVACY, GET_USER_GROUPS } from './crds-group-privacy-toggle.graphql';

@Component({
  tag: 'crds-group-privacy-toggle',
  styleUrl: 'crds-group-privacy-toggle.scss',
  shadow: true
})
export class CrdsGroupList {
  @Element() public host: HTMLStencilElement;
  @Prop() groupId: number;
  @Prop() isPublic: boolean;
  @State() userLedGroups: any[];

  public async componentWillLoad() {
    await CrdsApolloService.subscribeToApolloClient();
    await this.getGroupPrivacy();
    await this.getUserGroups();
  }

  private logError(err) {
    console.error(err);
  }

  private getGroupPrivacy(): Promise<any> {
    return CrdsApolloService.apolloClient
      .query({
        variables: { ids: this.groupId },
        query: GET_GROUP_PRIVACY
      })
      .then(response => {
        const selectedGroupData = response.data.groups.find(group => group.id == this.groupId);
        this.setIsPublicValue(selectedGroupData);
      })
      .catch(err => {
        this.logError(err);
      });
  }

  private setGroupPrivacy(Privacy): Promise<any> {
    return CrdsApolloService.apolloClient
      .mutate({
        variables: { id: this.groupId, isPublic: Privacy },
        mutation: SET_GROUP_PRIVACY
      })
      .then(response => {
        const selectedGroupData = response.data.setGroupPrivacy;
        this.setIsPublicValue(selectedGroupData);
      })
      .catch(err => {
        this.logError(err);
      });
  }

  private setIsPublicValue(selectedGroupData) {
    if (selectedGroupData) {
      this.isPublic = selectedGroupData.availableOnline;
    }
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

  public renderToggle() {
    return (
      <div class="form-group">
        <label class="control-label block"> Set your group to be public or private</label>
        <div class="btn-group btn-group-bar" role="group" data-toggle="buttons">
          <label class={'btn btn-default' + (this.isPublic === true ? ' active' : '')}>
            <input type="radio" checked={this.isPublic} autocomplete="off" onClick={() => this.setGroupPrivacy(true)} />
            Public
          </label>
          <label class={'btn btn-default' + (this.isPublic === false ? ' active' : '')}>
            <input
              type="radio"
              checked={!this.isPublic}
              autocomplete="off"
              onClick={() => this.setGroupPrivacy(false)}
            />
            Private
          </label>
        </div>
      </div>
    );
  }

  public render() {
    if ((!this.userLedGroups.find(group => Number(group.id) == this.groupId)) || !this.groupId)
      return '';
    return this.renderToggle();
  }
}