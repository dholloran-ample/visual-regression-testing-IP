import { Component, State, Prop, h } from '@stencil/core';
import Fragment from 'stencil-fragment';
import iframeResizer from 'iframe-resizer';

@Component({
  tag: 'crds-subscribe',
  styleUrl: 'crds-subscribe.scss',
  shadow: true
})
export class CrdsSubscribe {
  @Prop() title: string;
  @Prop() src: string;

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
          {this.title}
        </button>
        <crds-modal title={this.title} isActive={this.modalIsShowing} onClose={this.handleModalClose}>
          <iframe ref={el => (this.frame = el)} src={this.src} class="subscribe-frame" frameborder="0" />
        </crds-modal>
      </Fragment>
    );
  }
}
