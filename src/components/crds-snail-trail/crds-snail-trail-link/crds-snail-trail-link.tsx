import { Component, Element, Prop, h } from '@stencil/core';
import { parse } from 'url';

@Component({
  tag: 'crds-snail-trail-link',
  styleUrl: 'crds-snail-trail-link.scss',
  shadow: true
})
export class SnailTrailLink {
  @Prop() automationId: string;
  @Prop() href: string = '#';
  @Prop({ mutable: true }) isActive: boolean;
  @Element() element: HTMLElement;

  componentWillLoad() {
    const url = parse(this.href);
    const elPath = this.stripTrailingSlash(url.pathname);
    const currentPath = this.stripTrailingSlash(window.location.pathname);
    this.isActive = this.isActive == undefined ? elPath == currentPath : this.isActive;
  }

  stripTrailingSlash(str) {
    try {
      return str.replace(/^(.+?)\/*?$/, '$1');
    } catch {
      return str;
    }
  }

  clicked() {
    let siblings = this.element.parentNode.parentElement.querySelectorAll('crds-snail-trail-link');
    siblings.forEach(el => (el['isActive'] = false));
    this.isActive = true;
  }

  render() {
    let props = {
      href: this.href,
      onClick: this.clicked.bind(this),
      class: this.isActive ? 'active' : ''
    };
    return (
      <a data-automation-id={this.automationId} {...props}>
        <slot />
      </a>
    );
  }
}
