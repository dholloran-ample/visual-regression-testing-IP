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
              <a href="#" data-automation-id="sh-give-now">Give now</a>
            </li>
            <li class="top-level">
              <a href="#" data-automation-id="sh-my-giving">My giving</a>
            </li>
          </ul>
          <h4>About giving</h4>
          <ul>
            <li>
              <a href="#" data-automation-id="sh-why-give">Why give?</a>
            </li>
            <li>
              <a href="#" data-automation-id="sh-other-ways">Other ways to give</a>
            </li>
          </ul>
        </div>
      </div>
    );
  }
}
