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
    this.fetchData();
  }

  fetchUrl() {
    if (this.src) return this.src;
    let baseUrl = process.env.SNAIL_TRAIL_BASE_URL;
    if (baseUrl[baseUrl.length - 1] == '/') baseUrl = baseUrl.slice(0, -1);
    return `${baseUrl}/${this.name}/${this.env}.json`;
  }

  fetchData() {
    axios.get(this.fetchUrl()).then(response => (this.data = response.data));
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
