import { Component, Prop, Element } from '@stencil/core';

@Component({
  tag: 'crds-modal',
  styleUrl: 'crds-modal.scss',
  shadow: true
})
export class CrdsModal {
  @Prop({ mutable: true }) isActive: boolean = false;
  @Prop() onClose: Function;
  @Prop() title: string;

  @Element() element: HTMLElement;

  componentDidUpdate() {
    document.body.appendChild(this.element);
  }

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
            <slot />
          </div>
        </div>
      </div>
    );
  }
}
