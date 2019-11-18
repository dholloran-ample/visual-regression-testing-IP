import { Component, Prop, h } from '@stencil/core';
import { SimpleNavHelper } from './simple-nav-helper';
import { CrdsApolloService } from '../../../shared/apollo';
import { GET_USER } from './profile-nav.graphql';
import { isAuthenticated } from '../../../global/authInit';

@Component({
  tag: 'profile-nav',
  styleUrl: 'profile-nav.scss',
  shadow: true
})
export class ProfileMenu {
  @Prop() isNavShowing: boolean = true;
  @Prop() data: any = {};
  @Prop() user: any;
  @Prop() handleSignOut: Function;
  private simpleNav: SimpleNavHelper;

  constructor() {
    this.simpleNav = new SimpleNavHelper(this.handleSignOut);
  }

  public componentWillLoad() {
    return CrdsApolloService.subscribeToApolloClient();
  }

  public componentWillRender() {
    if (isAuthenticated()) this.getUser();
  }

  private getUser() {
    return CrdsApolloService.apolloClient.query({ query: GET_USER }).then(response => {
      this.user = response.data.user;
    });
  }

  private navTitle() {
    const title = (this.data && this.data.title) || '';
    return unescape(title.replace('%user_name%', this.user.nickName || ''));
  }

  private backgroundImageURL() {
    return (this.user && this.user.imageUrl) || '';
  }

  public render() {
    if (!this.isNavShowing || !this.simpleNav.isObjectTruthyNonArray(this.data)) return null;

    return (
      <div class="profile-nav">
        <div
          class="profile-nav-img"
          style={{
            backgroundImage: `linear-gradient(0deg, rgba(2,0,36,1) 0%, rgba(0,0,0,1) 30%, rgba(0,0,0,0) 100%),url('${this.backgroundImageURL()}')`
          }}
        />
        {this.simpleNav.renderNav(this.data, this.navTitle())}
      </div>
    );
  }
}
