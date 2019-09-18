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

  public parseTimeBasedGreetings(hour) {
    if (hour >= 17) return 'Good evening';
    if (hour >= 12) return 'Good afternoon';
    return 'Good morning';
  }

  public renderGreeting() {
    const date = new Date();
    const greeting = this.parseTimeBasedGreetings(date.getHours());
    return `${greeting}, ${this.displayName}`;
  }

  private logError(err) {
    console.error(err);
  }

  public render() {
    if (!this.displayName) return '';
    return (
      <div class="greeting">
        <h3 class="font-size-large flush">{this.renderGreeting()}</h3>
        <p class="flush">This place was made for you!</p>
      </div>
    );
  }
}
