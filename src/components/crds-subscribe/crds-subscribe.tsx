import { Component, State } from '@stencil/core';
import Fragment from 'stencil-fragment';
import iframeResizer from 'iframe-resizer';

@Component({
  tag: 'crds-subscribe',
  styleUrl: 'crds-subscribe.scss',
  shadow: true
})
export class CrdsSubscribe {
  @State() modalIsShowing: boolean = false;

  private frame: HTMLIFrameElement;

  componentDidUpdate() {
    iframeResizer.iframeResizer({}, this.frame);
  }

  handleSubscribeClick = () => {
    this.modalIsShowing = true;
  };

  handleModalClose = () => {
    this.modalIsShowing = false;
  };

  render() {
    return (
      <Fragment>
        <div class="subscribe-script" />
        <button onClick={this.handleSubscribeClick} class="subscribe-button">
          Subscribe
        </button>
        <crds-modal title="Subscribe" isActive={this.modalIsShowing} onClose={this.handleModalClose}>
          <iframe
            ref={el => (this.frame = el)}
            src="http://localhost:4000/hubspot-subscribe-form/"
            class="subscribe-frame"
          />
        </crds-modal>
      </Fragment>
    );
  }
}
