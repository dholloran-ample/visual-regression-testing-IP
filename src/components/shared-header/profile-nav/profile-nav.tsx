import { Component, Prop, Listen } from '@stencil/core';

@Component({
  tag: 'profile-nav',
  styleUrl: 'profile-nav.scss',
  shadow: true
})
export class ProfileMenu {
  @Prop() config: any;
  @Prop() currentUser: any;
  @Prop() onSignOut: Function;
  @Prop() profileNavIsShowing: boolean = true;

  envUrl(path) {
    return `${process.env.CRDS_BASE_URL}${path}`;
  }

  @Listen('click')
  handleClick(event) {
    event.stopPropagation();
  }

  render() {
    if (!this.profileNavIsShowing) return null;

    return (
      <div class="profile-nav">
        <div
          class="profile-nav-img"
          style={{
            backgroundImage: `linear-gradient(0deg, rgba(2,0,36,1) 0%, rgba(0,0,0,1) 30%, rgba(0,0,0,0) 100%),url('${
              this.currentUser.avatarUrl
            }')`
          }}
        />
        <div>
          <h2>Hello {this.currentUser.name.split(' ')[0]}</h2>
          <ul>
            <li class="top-level">
              <a href={this.envUrl('/profile/personal')} data-automation-id="sh-my-accounts">
                My account
              </a>
            </li>
            <li class="top-level">
              <a href={this.envUrl('/me/giving')} data-automation-id="sh-giving">
                Giving
              </a>
            </li>
            <li class="top-level">
              <a href="javascript:void(0)" onClick={e => this.onSignOut(e)} data-automation-id="sh-sign-out">
                Sign out
              </a>
            </li>
          </ul>
          <h4>Get involved</h4>
          <ul>
            <li>
              <a data-automation-id="sh-my-students-camps" href={this.envUrl('/mycamps')}>
                My student’s camps
              </a>
            </li>
            <li>
              <a data-automation-id="sh-sign-up-to-serve" href={this.envUrl('/serve/signup')}>
                Sign up to serve
              </a>
            </li>
            <li>
              <a data-automation-id="sh-my-groups" href={this.envUrl('/groups/search/my')}>
                My groups
              </a>
            </li>
            <li>
              <a data-automation-id="sh-my-trips" href={this.envUrl('/trips/mytrips')}>
                My trips
              </a>
            </li>
          </ul>
          <h4>Events</h4>
          <ul>
            <li>
              <a href={this.envUrl('/events')} data-automation-id="sh-event-check-in">
                Event check in
              </a>
            </li>
            <li>
              <a href={this.envUrl('/childcare')} data-automation-id="sh-childcare">
                Childcare (for events)
              </a>
            </li>
          </ul>
        </div>
      </div>
    );
  }
}
