import { Component, Element, Prop, State, Listen, h } from '@stencil/core';
import axios from 'axios';
import { Utils } from '../../shared/utils';
import Fragment from '../../shared/fragment';
import { testPayload } from './test_sh_data';

@Component({
  tag: 'crds-shared-header',
  styleUrl: 'crds-shared-header.scss',
  shadow: true
})
export class SharedHeader {
  @Prop() src: string;
  @Prop() env: string = 'prod';

  @State() active: string;
  @State() data: any = [];

  @Element() element: HTMLElement;

  /**
   * Fires before render...
   */

  public componentWillLoad() {
    this.data = testPayload;
    // const url = this.src || `https://crds-data.netlify.com/shared-header/${this.env}.json`;
    // return axios.get(url).then(response => (this.data = response.data)).catch(err => console.error(err));
  }

  componentDidLoad() {
    this.element.parentElement.classList.add('shared-header');
    this.element.parentElement.classList.remove('shared-header-skeleton');
  }

  public render() {
    return (
      <global-nav
        config={this.data.config} //TODO move this into global-nav?
        env={this.env}
        data={this.data}
      />
    );
  }
}
