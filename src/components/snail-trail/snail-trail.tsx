import { Component, Prop } from '@stencil/core';

@Component({
  tag: 'snail-trail',
  styleUrl: 'snail-trail.scss',
  shadow: true
})
export class TopBar {
  @Prop() href: string;
  @Prop() hidden: boolean = false;

  render() {
    if (this.hidden) return null;
    return (
      <nav>
        <div>
          <span>trending</span>
          <ul>
            <li>
              <a href="#" data-automation-id="st-groups">Groups</a>
            </li>
            <li>
              <a href="#" data-automation-id="st-camps">Camps</a>
            </li>
            <li>
              <a href="#" data-automation-id="st-recent-messages">recent messages</a>
            </li>
            <li>
              <a href="#" data-automation-id="st-undivided">Undivided</a>
            </li>
            <li>
              <a href="#" data-automation-id="st-lorem">lorem</a>
            </li>
            <li>
              <a href="#" data-automation-id="st-ipsum">ipsum</a>
            </li>
            <li>
              <a href="#" data-automation-id="st-subscribe">Subscribe</a>
            </li>
          </ul>
        </div>
      </nav>
    );
  }
}
