import { Component, Prop, h } from '@stencil/core';

// icons
import icons from './icons.svg';
import colors from '../../shared/crds-icon-colors.js';

@Component({
  tag: 'crds-icon',
  styleUrl: 'crds-icon.scss',
  shadow: true
})
export class CrdsIcon {
  @Prop() name: string;
  @Prop() color: string;
  @Prop() size: string;

  render() {
    const domparser = new DOMParser();
    const doc = domparser.parseFromString(icons, 'text/html');
    const svg = doc.getElementById(this.name);

    svg.setAttribute('preserveAspectRatio', `none`);
    svg.setAttribute('height', `${this.size}px`);
    svg.setAttribute('width', `${this.size}px`);
    svg.getElementsByTagName('path')[0].setAttribute('fill', colors[this.color]);

    return <div class="svg-container" innerHTML={svg.outerHTML} />;
  }
}
