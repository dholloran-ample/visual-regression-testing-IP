import { Component, Prop, State } from '@stencil/core';

@Component({
  tag: 'crds-modal',
  styleUrl: 'modal.scss',
  shadow: true
})
export class Modal {
  @Prop({ mutable: true }) isActive: boolean = false;
  @Prop() onClose: Function;
  @Prop() title: String;
  // @State() hubspotDidLoad = false;

  // loadScript = () => {
  //   // TODO: Actually load the script
  //   const hubspotEl = window.document.getElementById('hubspot');
  //   hubspotEl.addEventListener('load', () => {
  //     this.hubspotDidLoad = true;
  //   });
  // };

  handleInnerClick = event => {
    event.stopPropagation();
  };

  closeModal = () => {
    this.isActive = false;
    if (typeof this.onClose == 'function') this.onClose();
  };

  render() {
    return (
      <div
        class={`modal ${this.isActive ? 'is-active' : ''}`}
        id="subscribeModalForm"
        tabindex="-1"
        onClick={this.closeModal}
      >
        <div class="modal-content" onClick={this.handleInnerClick}>
          <div class="modal-header">
            <button type="button" class="modal-close" onClick={this.closeModal} />
          </div>
          <div class="modal-body">
            {this.title && <h3 class="modal-title">{this.title}</h3>}
            <p>Hello World!</p>
            {/* {this.hubspotDidLoad &&
              (window.document.getElementById('hubspot') as any).forms.create({
                portalId: '3993985',
                formId: '52b50268-5d9c-4369-8359-e96ff69094f9',
                formInstanceId: '1',
                submitButtonClass: 'modal-button',
                errorMessageClass: 'modal-error'
              })} */}
          </div>
        </div>
      </div>
    );
  }
}
