import { Component, Prop, State } from '@stencil/core';
import axios from 'axios';

@Component({
  tag: 'snail-trail',
  styleUrl: 'snail-trail.scss',
  shadow: true
})
export class SnailTrail {
  @Prop() src: string;

  @State() data: Array<any> = [];

  componentWillLoad() {
    axios.get(this.src).then(response => (this.data = response.data));
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
    return (
      <nav>
        <div>
          <ul>{this.listItems()}</ul>
        </div>
      </nav>
    );
  }
}
