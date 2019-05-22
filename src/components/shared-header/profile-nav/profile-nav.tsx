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
              <a href="#">My account</a>
            </li>
            <li class="top-level">
              <a href="#">Giving</a>
            </li>
            <li class="top-level">
              <a href="#">Sign out</a>
            </li>
          </ul>
          <h4>Get involved</h4>
          <ul>
            <li>
              <a href="#">My student’s camps</a>
            </li>
            <li>
              <a href="#">Sign up to serve</a>
            </li>
            <li>
              <a href="#">My groups</a>
            </li>
            <li>
              <a href="#">My trips</a>
            </li>
          </ul>
          <h4>Events</h4>
          <ul>
            <li>
              <a href="#">Event check in</a>
            </li>
            <li>
              <a href="#">Childcare (for events)</a>
            </li>
          </ul>
        </div>
      </div>
    );
  }
}
