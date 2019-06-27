import { Component, Element, Prop, State } from '@stencil/core';
import axios from 'axios';
import Fragment from 'stencil-fragment';

@Component({
  tag: 'snail-trail',
  styleUrl: 'snail-trail.scss',
  shadow: true
})
export class SnailTrail {
  @Prop() src: string;
  @Prop() env: string = 'prod';
  @Prop() name: string;

  @State() data: any = {};
  @State() modalIsShowing: boolean = false;

  @Element() element: HTMLElement;

  componentWillLoad() {
    if (this.name && this.env) {
      const url = this.src || `https://crds-data.netlify.com/snail-trails/${this.name}/${this.env}.json`;
      axios.get(url).then(response => (this.data = response.data));
    }
  }

  handleSubscribeClick = () => {
    // event.preventDefault();
    // event.stopPropagation();
    // console.log('SHOW MODAL');
    this.modalIsShowing = true;
  };

  handleModalClose = () => {
    this.modalIsShowing = false;
  };

  listItem(item) {
    if (!item.href) return <strong>{item.title}</strong>;
    return (
      <snail-trail-link href={item.href} automationId={item['data-automation-id']}>
        {item.title}
      </snail-trail-link>
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

  subscribeLink() {
    if (this.name === 'media') {
      return (
        <button onClick={this.handleSubscribeClick} class="subscribe-button">
          Subscribe
        </button>
      );
    }
  }

  subscribeModal() {
    if (this.name === 'media') {
      return <subscribe-modal modalIsShowing={this.modalIsShowing} onModalClose={this.handleModalClose} />;
    }
  }

  render() {
    if (!this.data.nav && this.element.childElementCount == 0) return;
    return (
      <Fragment>
        <nav>
          <div>
            {this.element.childElementCount > 0 && <slot />}
            {this.element.childElementCount == 0 && (
              <Fragment>
                {this.navSections()}
                {this.subscribeLink()}
              </Fragment>
            )}
          </div>
        </nav>
        {this.subscribeModal()}
      </Fragment>
    );
  }
}
