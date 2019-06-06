import { Component, Prop } from '@stencil/core';

@Component({
  tag: 'profile-nav',
  styleUrl: 'profile-nav.scss',
  shadow: true
})
export class ProfileMenu {
  @Prop() profileNavIsShowing: boolean = true;

  render() {
    if (!this.profileNavIsShowing) return null;

    return (
      <div class="profile-nav">
        <div>
          <h2>Hello Wayne</h2>
          <ul>
            <li class="top-level">
              <a href="#" data-automation-id="sh-my-accounts">My account</a>
            </li>
            <li class="top-level">
              <a href="#" data-automation-id="sh-giving">Giving</a>
            </li>
            <li class="top-level">
              <a href="#" data-automation-id="sh-sign-out">Sign out</a>
            </li>
          </ul>
          <h4>Get involved</h4>
          <ul>
            <li>
              <a href="#" data-automation-id="sh-my-students-camps">My student’s camps</a>
            </li>
            <li>
              <a href="#" data-automation-id="sh-sign-up-to-serve">Sign up to serve</a>
            </li>
            <li>
              <a href="#" data-automation-id="sh-my-groups">My groups</a>
            </li>
            <li>
              <a href="#" data-automation-id="sh-my-trips">My trips</a>
            </li>
          </ul>
          <h4>Events</h4>
          <ul>
            <li>
              <a href="#" data-automation-id="sh-event-check-in">Event check in</a>
            </li>
            <li>
              <a href="#" data-automation-id="sh-childcare">Childcare (for events)</a>
            </li>
          </ul>
        </div>
      </div>
    );
  }
}
