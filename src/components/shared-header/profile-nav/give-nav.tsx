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
    let top_level = false;

    return (
      <div>
        <h2> {payload.title} </h2>
        {payload.children.map(child => {
          top_level = top_level || typeof child == 'string';

          return (
            <div style={{ padding: '0' }}>
              {typeof child == 'string' && <h4>{child}</h4>}
              {typeof child != 'string' && (
                <ul>
                  {child.map(el => {
                    if (typeof el != 'string')
                      return (
                        <li class={top_level ? 'top-level' : ''}>
                          <a href={el.href} automation-id={el['automation-id']}>
                            {' '}
                            {el.title}
                          </a>
                        </li>
                      );
                  })}
                </ul>
              )}
            </div>
          );
        })}
      </div>
    );
  };

  render() {
    if (!this.giveNavIsShowing) return null;
    return (
      <div class="give-nav" style={{ backgroundImage: `url(${(this.data as any).background_img})` }}>
        {this.renderSections(this.data)}
      </div>
    );
  }
}
