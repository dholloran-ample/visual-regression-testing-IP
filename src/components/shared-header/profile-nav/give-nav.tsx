import { Component, Prop, Listen } from '@stencil/core';

@Component({
  tag: 'give-nav',
  styleUrl: 'profile-nav.scss',
  shadow: true
})
export class GiveMenu {
  @Prop() giveNavIsShowing: boolean = true;

  @Listen('click')
  handleClick(event) {
    event.stopPropagation();
  }

  render() {
    if (!this.giveNavIsShowing) return null;

    return (
      <div class="give-nav">
        <div>
          <h2>Give</h2>
          <ul>
            <li class="top-level">
              <a href="#">Give now</a>
            </li>
            <li class="top-level">
              <a href="#">My giving</a>
            </li>
          </ul>
          <h4>About giving</h4>
          <ul>
            <li>
              <a href="#">Why give?</a>
            </li>
            <li>
              <a href="#">Other ways to give</a>
            </li>
          </ul>
        </div>
      </div>
    );
  }
}
