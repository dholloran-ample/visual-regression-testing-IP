import { Component, State, Element, h } from '@stencil/core';
import ApolloClient from 'apollo-client';
import { CrdsApolloService } from '../../shared/apollo';
import { GroupUser, Group } from './crds-group-list.interface';
import { HTMLStencilElement } from '@stencil/core/internal';
import { GET_GROUPS } from './crds-group-list.graphql';
import { ContentBlockHandler } from '../../shared/contentBlocks/contentBlocks';
import { isAuthenticated } from '../../global/authInit';

@Component({
  tag: 'crds-group-list',
  styleUrl: 'crds-group-list.scss',
  shadow: true
})
export class CrdsGroupList {
  private contentBlockHandler: ContentBlockHandler;

  @State() user: GroupUser;
  @State() expanded: boolean = false;
  @Element() public host: HTMLStencilElement;
  private leader: boolean;

  public async componentWillLoad() {
    await CrdsApolloService.initApolloClient();
    this.contentBlockHandler = new ContentBlockHandler(CrdsApolloService.apolloClient, 'group list');
    this.contentBlockHandler.getCopy().then(() => {
      this.host.forceUpdate();
    })
    this.getUserGroups();
  }

  public getUserGroups() {
    if (!isAuthenticated()) return null;
    return CrdsApolloService.apolloClient
      .query({ query: GET_GROUPS })
      .then(success => {
        this.user = success.data.user;
        this.leader = this.user.groups.filter(group => group.role.name === 'Leader').length > 0;
      })
      .catch(err => {
        this.logError(err);
      });
  }

  private convertTime(time): string {
    const arr = time.split(':');
    var suffix = arr[0] >= 12 ? 'PM' : 'AM';
    var hours = arr[0] % 12 || 12;
    var minutes = arr[1];

    return `${hours}:${minutes} ${suffix}`;
  }

  private logError(err) {
    console.error(err);
  }

  public renderMeetingTime(group: Group) {
    if (group.meeting.day)
      return `${group.meeting.day} at ${this.convertTime(group.meeting.time)}, ${group.meeting.frequency}`;
    else return 'Flexible Meeting Time';
  }

  public renderLeaderTag(group: Group) {
    if (group.role.name === 'Leader') {
      return (
        <p class="leader-tag">
          <span class="label label-info">Leader</span>
        </p>
      );
    }
  }

  public renderGroupList() {
    const groups = !this.expanded && this.user.groups.length > 3 ? this.user.groups.slice(0, 3) : this.user.groups;
    return groups.map(group => {
      return (
        <div class="group d-flex push-half-bottom">
          <div class="group-text">
            <h4 class="list-header">
              <a href={group.url}>{group.name}</a>
            </h4>
            <p class="control-label text-gray-light flush">{this.renderMeetingTime(group)}</p>
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
    });
  }

  public renderUserGroupState() {
    if (this.user && this.user.groups.length > 0) {
      return [this.renderGroupList(), this.renderShowMoreLink()];
    } else {
      return this.contentBlockHandler.getContentBlock('group-list-none-header');
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

  private renderGroupSkeleton() {
    return [1, 2, 3].map(() => (
      <div class="d-flex push-bottom">
        <div class="skeleton text-skeleton">
          <div class="title shimmer" />
          <div class="subtitle shimmer" />
        </div>
        <div class="skeleton avatar-skeleton">
          <div class="shimmer" />
        </div>
      </div>
    ));
  }

  public renderUserGreeting() {
    if (this.user) {
      return (
        <div class="push-half-top groups-cta">
          <strong class="text-gray">Hey {this.user.nickName || this.user.firstName}!</strong>{' '}
          <span class="text-gray-light">{this.renderCallToAction()}</span>
        </div>
      );
    }
  }

  public renderShowMoreLink() {
    if (this.user.groups.length > 3)
      return (
        <btn onClick={(() => this.expanded = !this.expanded)} class="btn btn-sm btn-gray-light btn-outline">
          {this.user.groups.length > 3 && (this.expanded ? 'Show Less': 'Show More')}
        </btn>
      );
  }

  public render() {
    const renderUserGroupState = this.user;
    return (
      <div class="group-list">
        <div class="group-list-header text-gray-light font-family-base">
          {this.contentBlockHandler.getContentBlock('group-list-header')}
        </div>
        {(() => {
          if (this.user) return this.renderUserGroupState();
          return this.renderGroupSkeleton();
        })()}
        {this.renderUserGreeting()}
      </div>
    );
  }
}
