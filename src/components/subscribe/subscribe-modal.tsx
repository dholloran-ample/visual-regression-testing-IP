import { Component, Prop, State } from '@stencil/core';

@Component({
  tag: 'subscribe-modal',
  styleUrl: 'subscribe-modal.scss',
  shadow: true
})
export class Subscribe {
  @Prop({ mutable: true }) modalIsShowing: boolean = false;
  @Prop() onModalClose: Function;
  @State() hubspotDidLoad = false;

  loadScript = () => {
    // TODO: Actually load the script
    const hubspotEl = window.document.getElementById('hubspot');
    hubspotEl.addEventListener('load', () => {
      this.hubspotDidLoad = true;
    });
  };

  // handleOuterClick = () => {
  // };

  handleInnerClick = event => {
    event.stopPropagation();
  };

  closeModal = () => {
    this.modalIsShowing = false;
    if (typeof this.onModalClose == 'function') this.onModalClose();
  };

  render() {
    // console.log('subscribe-modal - modalIsShowing = ' + this.modalIsShowing);
    // this.loadScript();

    return (
      <div
        class={`modal ${this.modalIsShowing ? 'is-active' : ''}`}
        id="subscribeModalForm"
        tabindex="-1"
        onClick={this.closeModal}
      >
        <div class="modal-content" onClick={this.handleInnerClick}>
          <div class="modal-header">
            <button type="button" class="modal-close" onClick={this.closeModal} />
          </div>
          <div class="modal-body">
            <h3 class="modal-title">Subscribe</h3>
            <p>Hello World!</p>
            {this.hubspotDidLoad &&
              (window.document.getElementById('hubspot') as any).forms.create({
                portalId: '3993985',
                formId: '52b50268-5d9c-4369-8359-e96ff69094f9',
                formInstanceId: '1',
                submitButtonClass: 'modal-button',
                errorMessageClass: 'modal-error'
              })}
          </div>
        </div>
      </div>
    );
  }
}
