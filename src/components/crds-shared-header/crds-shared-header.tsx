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
    const url = this.src || `https://crds-data.crossroads.net/shared-header/${this.env}.json`;
    return axios
      .get(url)
      .then(response => {
        this.data = response.data;
      })
      .catch(err => console.error(err));
  }

  componentDidLoad() {
    let svgChildNode = this.element.parentElement.getElementsByTagName('svg')[0];
    if (svgChildNode != undefined) {
      svgChildNode.remove();
    }
    this.element.parentElement.classList.remove('shared-header-skeleton');
    this.element.parentElement.classList.add('shared-header');
  }

  public render() {
    return <global-nav env={this.env} data={this.data} />;
  }
}
