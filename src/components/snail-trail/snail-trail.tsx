import { Component, Prop, State } from '@stencil/core';
import axios from 'axios';

@Component({
  tag: 'snail-trail',
  styleUrl: 'snail-trail.scss',
  shadow: true
})
export class SnailTrail {
  @Prop() src: string;
  @Prop() env: string = 'prod';
  @Prop() name: string;

  @State() data: Array<any> = [];

  componentWillLoad() {
    axios.get(this.fetchUrl()).then(response => (this.data = response.data));
  }

  fetchUrl() {
    if (this.src) return this.src;
    return `https://crds-data.netlify.com/snail-trails/${this.name}/${this.env}.json`;
  }

  listItems() {
    return this.data.map(item => {
      if (typeof item === 'string') return <span>{item}</span>;
      let attrs = { href: item.path };
      if (item['automation-id']) attrs['data-automation-id'] = item['automation-id'];
      return (
        <li>
          <a {...attrs}>{item.title}</a>
        </li>
      );
    });
  }

  render() {
    if (this.data.length === 0) return null;
    return (
      <nav>
        <div>
          <ul>{this.listItems()}</ul>
        </div>
      </nav>
    );
  }
}
