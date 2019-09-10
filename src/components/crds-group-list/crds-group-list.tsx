import { Component, Prop, State, Element, Watch, h } from '@stencil/core';
import ApolloClient from 'apollo-client';
import { CrdsApollo } from '../../shared/apollo';
import { GroupUser, Group } from './crds-group-list.interface';
import { HTMLStencilElement } from '@stencil/core/internal';
import { GET_GROUPS } from './crds-group-list.graphql';

@Component({
  tag: 'crds-group-list',
  styleUrl: 'crds-group-list.scss',
  shadow: true
})
export class CrdsGroupList {
  private apolloClient: ApolloClient<{}>;

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
      return <p class="leader-tag">Leader</p>;
    }
  }

  public renderDefault() {
    console.log('called renderDefault()');
    if (!this.user) return null;
    return (
      <div>
        <h2>You haven't joined a group yet</h2>
        <strong>Hey {this.user.contact.nickName || this.user.contact.firstName}! </strong>
        You can make this big place feel small. Find your tribe to connect with people, yourself, and God.
        <br />
        <a href="/connect">Search Groups</a>
      </div>
    );
  }

  public renderGroupList() {
    console.log('called renderGroupList()');
    return this.user.groups.map(group => (
      <div class="card">
        <h2>{group.name}</h2>
        <p>{group.meeting.day} at {group.meeting.time}, {group.meeting.frequency}</p>
        {this.renderLeaderTag(group)}
        <p>Render Image here</p>
      </div>
    ));
  }

  public renderUserGroupState() {
    if (this.user) {
      if (this.user.groups.length > 0) {
        return this.renderGroupList();
      }
    }
    return this.renderDefault();
  }

  public renderLeaderContent() {
    if (this.user) {
      if (this.leader) {
        return (
          <div>
            <strong>Hey {this.user.contact.nickName || this.user.contact.firstName}! </strong>
            Looking to revive your leader skills and get refreshed?
            <br />
            <a href="/leadersummiturl">Join us at the leader summit</a>
          </div>
        );
      } else if (this.user.groups.length > 0) {
        return (
          <div>
            <strong>Hey {this.user.contact.nickName || this.user.contact.firstName}! </strong>
            Looking to take the next step? Consider leading your own group.
            <br />
            <a href="/groupsarefun">Learn More About Leading A Group</a>
          </div>
        );
      }
    }
  }

  public render() {
    return (
      <div class="group-list">
        <div class="group-list-header">my groups</div>
        {this.renderUserGroupState()}
        {this.renderLeaderContent()}
      </div>
    );
  }
}
