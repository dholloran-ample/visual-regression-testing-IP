import { Component, Element, Prop, State, Listen, h } from '@stencil/core';
import axios from 'axios';

@Component({
  tag: 'crds-shared-header',
  styleUrl: 'crds-shared-header.scss',
  shadow: true
})
export class SharedHeader {
  @Prop() src: string;
  @Prop() env: string = 'prod';

  @State() active: string;
  @State() data: any = {};

  @Element() element: HTMLElement;

  public componentWillLoad() {
    const url = this.src || `https://crds-data.netlify.com/shared-header/${this.env}.json`;
    return axios.get(url).then(response => (this.data = response.data)).catch(err => console.error(err));
  }

  componentDidLoad() {
    this.element.parentElement.classList.add('shared-header');
    this.element.parentElement.classList.remove('shared-header-skeleton');
  }

  public render() {
    return (
      <global-nav
        env={this.env}
        data={this.data}
      />
    );
  }
}
