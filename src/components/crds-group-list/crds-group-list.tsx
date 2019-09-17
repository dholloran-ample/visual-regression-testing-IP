import { Component, Prop, State, Element, Watch, h } from '@stencil/core';
import ApolloClient from 'apollo-client';
import { CrdsApollo } from '../../shared/apollo';
import { GroupUser, Group } from './crds-group-list.interface';
import { HTMLStencilElement } from '@stencil/core/internal';
import { GET_GROUPS } from './crds-group-list.graphql';
import { ContentBlockHandler } from '../../shared/contentBlocks/contentBlocks';

@Component({
  tag: 'crds-group-list',
  styleUrl: 'crds-group-list.scss',
  shadow: true
})
export class CrdsGroupList {
  private apolloClient: ApolloClient<{}>;
  private validGroups = ['Small Group', 'Journey'];
  private contentBlockHandler: ContentBlockHandler;

  @State() user: GroupUser;
  @Prop() authToken: string;
  @Element() public host: HTMLStencilElement;
  private leader: boolean;

  @Watch('authToken')
  authTokenHandler(newValue: string, oldValue: string) {
    if (newValue !== oldValue) {
      this.apolloClient = CrdsApollo(newValue);
      this.getUserGroups();
    }
  }

  public componentWillLoad() {
    this.apolloClient = CrdsApollo(this.authToken);
    this.contentBlockHandler = new ContentBlockHandler(this.apolloClient, 'group list');
    this.contentBlockHandler.getCopy();
    this.getUserGroups();
  }

  public getUserGroups() {
    if (!this.authToken) return null;
    return this.apolloClient
      .query({ query: GET_GROUPS })
      .then(success => {
        this.user = success.data.user;
        this.leader = this.user.groups.filter(group => group.role.name === 'Leader').length > 0;
        console.log(this.user, this.leader);
      })
      .catch(err => {
        this.logError(err);
      });
  }

  private logError(err) {
    console.error(err);
  }

  public renderLeaderTag(group: Group) {
    if (group.role.name === 'Leader') {
      return <p class="leader-tag"><span class="label label-info">Leader</span></p>;
    }
  }

  public renderGroupList() {
    console.log('called renderGroupList()');
    return this.user.groups.map(group => {
      console.log(group);
      if (this.validGroups.includes(group.type.name)) {
        return (
          <div class="group d-flex push-half-bottom">
            <div class="group-text">
              <h4 class="list-header"><a href="#">{group.name}</a></h4>
              <p class="control-label text-gray-light flush">
                {group.meeting.day} at {group.meeting.time}, {group.meeting.frequency}
              </p>
              {this.renderLeaderTag(group)}
            </div>
            <div
              class="push-half-bottom group-image img-responsive img-circle"
              style={{
                backgroundImage: `url('https://${group.image}')
                                 ,url('https://crossroads-media.imgix.net/images/avatar.svg')`
              }}
            />
          </div>
        );
      }
    });
  }

  public renderUserGroupState() {
    if (this.user && this.user.groups.length > 0) {
      return this.renderGroupList();
    }
  }

  public renderCallToAction() {
    if (this.user) {
      if (this.leader) {
        return this.contentBlockHandler.getContentBlock('group-list-leader');
      } else if (this.user.groups.length > 0) {
        return this.contentBlockHandler.getContentBlock('group-list-member');
      } else {
        return this.contentBlockHandler.getContentBlock('group-list-none');
      }
    }
  }

  public render() {
    return (
      <div class="group-list">
        <p class="text-gray-light font-family-base">my groups</p>
        {this.renderUserGroupState()}
        <span>
          <strong>Hey {this.user.nickName || this.user.firstName}!</strong> 
          {this.renderCallToAction()}
        </span>
      </div>
    );
  }
}
