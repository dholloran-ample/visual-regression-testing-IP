import { CrdsApolloService } from '../../shared/apollo';
import { HTMLStencilElement } from '@stencil/core/internal';
import { Component, Element, h, Prop } from '@stencil/core';
import { GET_GROUP_PRIVACY, SET_GROUP_PRIVACY } from './crds-group-privacy-toggle.graphql';

@Component({
  tag: 'crds-group-privacy-toggle',
  styleUrl: 'crds-group-privacy-toggle.scss',
  shadow: true
})
export class CrdsGroupList {
  @Element() public host: HTMLStencilElement;
  @Prop() groupId: number;
  @Prop() isPublic: boolean;

  public async componentWillLoad() {
    await CrdsApolloService.subscribeToApolloClient();
    await this.getGroupPrivacy();
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
        const selectedGroupData = response.data.groups.filter(group => group.id == this.groupId)[0];
        if (selectedGroupData) {
          this.isPublic = selectedGroupData.availableOnline;
        }
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
        console.log('response', response);
        this.getGroupPrivacy();
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
    if (this.groupId) return this.renderToggle();
  }
}
