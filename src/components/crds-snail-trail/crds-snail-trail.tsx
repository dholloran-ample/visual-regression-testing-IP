import { Component, Element, Prop, State, h } from '@stencil/core';
import axios from 'axios';
import Fragment from '../../shared/fragment';

@Component({
  tag: 'crds-snail-trail',
  styleUrl: 'crds-snail-trail.scss',
  shadow: true
})
export class SnailTrail {
  @Prop() src: string;
  @Prop() env: string = 'prod';
  @Prop() name: string;

  @State() data: any = {};

  @Element() element: HTMLElement;

  componentWillLoad() {
    if (this.src || (this.name && this.env)) {
      const url = this.src || `https://crds-data.netlify.com/snail-trails/${this.name}/${this.env}.json`;
      axios.get(url).then(response => (this.data = response.data));
    }
  }

  listItem(item) {
    if (item.subscribe && item.src) return <crds-subscribe src={item.src} label={item.title} />;
    if (!item.href) return <strong>{item.title}</strong>;
    return (
      <crds-snail-trail-link href={item.href} automationId={item['data-automation-id']}>
        {item.title}
      </crds-snail-trail-link>
    );
  }

  list(section) {
    return section.map(item => {
      return <li>{this.listItem(item)}</li>;
    });
  }

  navSections() {
    if (!this.data.nav) return;
    return this.data.nav.map(section => <ul>{this.list(section)}</ul>);
  }

  render() {
    if (!this.data.nav && this.element.childElementCount == 0) return;
    return (
      <Fragment>
        <nav>
          <div>
            {this.element.childElementCount > 0 && <slot />}
            {this.element.childElementCount == 0 && <Fragment>{this.navSections()}</Fragment>}
          </div>
        </nav>
      </Fragment>
    );
  }
}
