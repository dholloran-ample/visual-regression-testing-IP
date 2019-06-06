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
              <a href="#" data-automation-id="sh-groups">Groups</a>
            </li>
            <li>
              <a href="#" data-automation-id="sh-camps">Camps</a>
            </li>
            <li>
              <a href="#" data-automation-id="sh-recent-messages">recent messages</a>
            </li>
            <li>
              <a href="#" data-automation-id="sh-undivided">Undivided</a>
            </li>
            <li>
              <a href="#" data-automation-id="sh-lorem">lorem</a>
            </li>
            <li>
              <a href="#" data-automation-id="sh-ipsum">ipsum</a>
            </li>
            <li>
              <a href="#" data-automation-id="sh-subscribe">Subscribe</a>
            </li>
          </ul>
        </div>
      </nav>
    );
  }
}
