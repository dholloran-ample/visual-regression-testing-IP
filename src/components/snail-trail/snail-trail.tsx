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
              <a href="#">Groups</a>
            </li>
            <li>
              <a href="#">Camps</a>
            </li>
            <li>
              <a href="#">recent messages</a>
            </li>
            <li>
              <a href="#">Undivided</a>
            </li>
            <li>
              <a href="#">lorem</a>
            </li>
            <li>
              <a href="#">ipsum</a>
            </li>
            <li>
              <a href="#">Subscribe</a>
            </li>
          </ul>
        </div>
      </nav>
    );
  }
}
