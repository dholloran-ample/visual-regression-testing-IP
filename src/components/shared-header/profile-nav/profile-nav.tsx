import { Component, Prop } from '@stencil/core';

@Component({
  tag: 'profile-nav',
  styleUrl: 'profile-nav.scss',
  shadow: true
})
export class ProfileMenu {
  @Prop() profileNavIsShowing: boolean = true;
  @Prop() onSignOut: Function;
  @Prop() currentUser: any;

  envUrl(path) {
    return `${process.env.CRDS_BASE_URL}${path}`;
  }

  render() {
    if (!this.profileNavIsShowing) return null;

    return (
      <div class="profile-nav">
        <div class="profile-nav-img" style={{ backgroundImage: `url('${this.currentUser.avatarUrl}')` }} />
        <div>
          <h2>Hello {this.currentUser.name.split(' ')[0]}</h2>
          <ul>
            <li class="top-level">
              <a href={this.envUrl('/profile/personal')}>My account</a>
            </li>
            <li class="top-level">
              <a href={this.envUrl('/me/giving')}>Giving</a>
            </li>
            <li class="top-level">
              <a href="javascript:void(0)" onClick={e => this.onSignOut(e)}>
                Sign out
              </a>
            </li>
          </ul>
          <h4>Get involved</h4>
          <ul>
            <li>
              <a href={this.envUrl('/mycamps')}>My student’s camps</a>
            </li>
            <li>
              <a href={this.envUrl('/serve/signup')}>Sign up to serve</a>
            </li>
            <li>
              <a href={this.envUrl('/groups/search/my')}>My groups</a>
            </li>
            <li>
              <a href={this.envUrl('/trips/mytrips')}>My trips</a>
            </li>
          </ul>
          <h4>Events</h4>
          <ul>
            <li>
              <a href={this.envUrl('/events')}>Event check in</a>
            </li>
            <li>
              <a href={this.envUrl('/childcare')}>Childcare (for events)</a>
            </li>
          </ul>
        </div>
      </div>
    );
  }
}
