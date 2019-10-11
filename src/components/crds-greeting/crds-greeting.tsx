import { Component, Prop, State, Element, Watch, h } from '@stencil/core';
import { GreetingUser } from './crds-greeting-interface';
import { HTMLStencilElement } from '@stencil/core/internal';
import { GET_USER } from './crds-greeting.graphql';
import ApolloClient from 'apollo-client';
import { CrdsApollo } from '../../shared/apollo';

@Component({
  tag: 'crds-greeting',
  styleUrl: 'crds-greeting.scss',
  shadow: true
})
export class CrdsGreeting {
  private apolloClient: ApolloClient<{}>;
  private user: GreetingUser = null;
  private chunkOfDay: string;

  @State() displayName: string = null;
  @Prop() authToken: string;
  @Prop() defaultName: string;
  @Element() public host: HTMLStencilElement;

  @Watch('authToken')
  authTokenHandler(newValue: string, oldValue: string) {
    if (newValue !== oldValue) {
      this.apolloClient = CrdsApollo(newValue);
      this.getUser();
    }
  }

  public componentWillLoad(){ 
    this.apolloClient = CrdsApollo(this.authToken);
  }

  public componentWillRender() {
    this.chunkOfDay = this.getChunkOfDay();
    if (this.authToken) return this.getUser();
  }

  public componentDidRender() {
    const renderedEvent = new CustomEvent('component rendered', {
      detail: this.host
    });
    document.dispatchEvent(renderedEvent);

    setTimeout(() => {
      this.host.shadowRoot.querySelector('.greeting').classList.add('fade-in');
    }, 0);
  }

  public getUser() {
    return this.apolloClient
      .query({ query: GET_USER })
      .then(success => {
        this.user = success.data.user;
        this.getDisplayName();
        return;
      })
      .catch(err => {
        this.getDisplayName();
        this.logError(err);
      });
  }

  private getDisplayName(): void {
    this.displayName = (this.user && (this.user.nickName || this.user.firstName)) || this.defaultName || '';
  }

  public renderGreeting() {
    return `Good ${this.chunkOfDay}, `;
  }

  public renderName() {
    return `${this.displayName}`
  }

  private getChunkOfDay(): string {
    const hour = new Date().getHours();
    if (hour >= 17) return 'evening';
    if (hour >= 12) return 'afternoon';
    return 'morning';
  }

  public renderColor() {
    return `${this.chunkOfDay}-color`;
  }

  public renderImage() {
    if (this.chunkOfDay === 'evening') return 'https://crds-media.imgix.net/5wpDvJsiuBIYC7BRrCqE04/9189f384f2ac9b211e4841edf0b24f7d/evening-greeting.png';
    if (this.chunkOfDay === 'afternoon') return 'https://crds-media.imgix.net/1Y0Nzb0RLd1BUpk5fgQETO/210b6787f44c17169ad0455e6d0d7484/afternoon-greeting.png';
    return 'https://crds-media.imgix.net/35CRCDPcTPotq2zBF7Zvsx/94d58dea65820545dd888862abf9e21d/morning-greeting.png';
  }

  private logError(err) {
    console.error(err);
  }

  public render() {
    if (!this.displayName) return '';
    return (
      <div class="greeting d-flex">
        <img class="greeting-image" src={this.renderImage()} />
        <div class="flex-column m-auto-ends push-half-left soft-half-ends">
          <h3 class="component-header flush">{this.renderGreeting()}<span class={this.renderColor()}>{this.renderName()}</span></h3>
          <p class="text-gray-dark flush">This place was made for you!</p>
        </div> 
      </div>
    );
  }
}
