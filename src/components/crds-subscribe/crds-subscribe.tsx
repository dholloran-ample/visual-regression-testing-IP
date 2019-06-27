import { Component, State } from '@stencil/core';
import Fragment from 'stencil-fragment';

@Component({
  tag: 'crds-subscribe',
  styleUrl: 'crds-subscribe.scss',
  shadow: true
})
export class CrdsSubscribe {
  @State() hubspotDidLoad = false;
  @State() modalIsShowing: boolean = false;

  private tempFormContainer: HTMLElement;
  private formContainer: HTMLElement;

  componentDidLoad() {
    this.loadHubspotScript();
  }

  loadHubspotScript() {
    if (this.hubspotDidLoad && window['hbspt']) return true;
    let script = document.createElement('script');
    script['src'] = '//js.hsforms.net/forms/v2.js';
    script.addEventListener('load', () => (this.hubspotDidLoad = true), false);
    document.getElementsByTagName('head')[0].appendChild(script);
  }

  handleSubscribeClick = () => {
    this.modalIsShowing = true;
  };

  handleModalClose = () => {
    this.modalIsShowing = false;
  };

  renderTempHubspotFormContainer() {
    if (this.tempFormContainer) return;
    this.tempFormContainer = document.getElementById('crds-subscribe-hubspot-form-container');
    if (!this.tempFormContainer) {
      let container = document.createElement('div');
      container.setAttribute('id', 'crds-subscribe-hubspot-form-container');
      container.style.display = 'none';
      document.getElementsByTagName('body')[0].appendChild(container);
      this.tempFormContainer = document.getElementById('crds-subscribe-hubspot-form-container');
    }
  }

  // handleHubspotFormReady = function(_$form, _ctx) {
  //   console.log(this.tempFormContainer.innerHTML);
  // };

  waitForHubspotForm = (idx = 0) => {
    if (idx++ >= 20) return;
    const form = this.tempFormContainer.querySelector('.hbspt-form');
    if (!form || !form.innerHTML) return setTimeout(this.waitForHubspotForm, 250, idx);

    this.formContainer.innerHTML = form.outerHTML;
  };

  renderHubspotForm() {
    if (!this.hubspotDidLoad || !window['hbspt']) return null;
    this.renderTempHubspotFormContainer();

    window['jQuery'] =
      window['jQuery'] ||
      (() => ({
        change: () => {},
        trigger: () => {}
      }));

    const script = document.createElement('script');
    script.innerHTML = `
      window['hbspt'].forms.create({
        portalId: '3993985',
        formId: '52b50268-5d9c-4369-8359-e96ff69094f9'
      });
    `;

    this.tempFormContainer.innerHTML = null;
    this.tempFormContainer.appendChild(script);

    this.waitForHubspotForm();
  }

  render() {
    return (
      <Fragment>
        <div class="subscribe-script" />
        <button onClick={this.handleSubscribeClick} class="subscribe-button">
          Subscribe
        </button>
        <crds-modal title="Subscribe" isActive={this.modalIsShowing} onClose={this.handleModalClose}>
          --- {this.renderHubspotForm()} ---
          <div ref={el => (this.formContainer = el)} />
        </crds-modal>
      </Fragment>
    );
  }
}
