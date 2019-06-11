import { Component, Prop, Listen } from '@stencil/core';
import { Utils } from '../../../shared/utils';

@Component({
  tag: 'give-nav',
  styleUrl: 'profile-nav.scss',
  shadow: true
})
export class GiveMenu {
  @Prop() giveNavIsShowing: boolean = true;
  @Prop() data: JSON;

  @Listen('click')
  handleClick(event) {
    event.stopPropagation();
  }

  renderSections = payload => {
    return payload.map(section => {
      return (
        <div>
          {section.title && <h4>{section.title}</h4>}
          <ul>
            {section.children.map(el => {
              return <li class={el['top_level'] ? 'top-level' : ''}> <a href={el.path} automation-id={el['automation-id']} ></a> el.title </li>;
            })}
          </ul>
        </div>
      );
    });
  };

  render() {
    if (!this.giveNavIsShowing) return null;

    return (
      <div class="give-nav">
        <h2>Give</h2>
        <div>
          <ul>
            <li class="top-level">
              <a href="#" data-automation-id="sh-give-now">
                Give now
              </a>
            </li>
            <li class="top-level">
              <a href="#" data-automation-id="sh-my-giving">
                My giving
              </a>
            </li>
          </ul>
          <h4>About giving</h4>
          <ul>
            <li>
              <a href="#" data-automation-id="sh-why-give">
                Why give?
              </a>
            </li>
            <li>
              <a href="#" data-automation-id="sh-other-ways">
                Other ways to give
              </a>
            </li>
          </ul>
        </div>
      </div>
    );
  }
}
