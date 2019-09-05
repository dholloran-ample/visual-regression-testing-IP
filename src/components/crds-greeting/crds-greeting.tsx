import { Component, Prop, State, Element, Watch, h } from '@stencil/core';
import { GreetingUser } from './crds-greeting-interface';
import { HTMLStencilElement } from '@stencil/core/internal';
import { GET_NAMES } from './crds-greeting.graphql';
import ApolloClient from 'apollo-client';
import { CrdsApollo } from '../../shared/apollo';

@Component({
  tag: 'crds-greeting',
  styleUrl: 'crds-greeting.scss',
  shadow: true
})
export class CrdsGreeting {
  private apolloClient: ApolloClient<{}>;

  @State() user: GreetingUser = {
    contact: {
      firstName: null,
      nickName: null
    }
  };
  @Prop() authToken: string;
  @Prop() defaultName: string;
  @Element() public host: HTMLStencilElement;

  @Watch('authToken')
  authTokenHandler(newValue: string, oldValue: string) {
    if (newValue !== oldValue) {
      this.apolloClient = CrdsApollo(newValue);
      this.getUserName();
    }
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

  public getUserName() {
    return this.apolloClient
      .query({ query: GET_NAMES })
      .then(success => {
        this.user = success.data.user;
      })
      .catch(err => {
        this.logError(err);
      });
  }

  public parseTimeBasedGreetings(hour) {
    if (hour >= 17) return 'Good evening';
    if (hour >= 12) return 'Good afternoon';
    return 'Good morning';
  }

  public renderGreeting() {
    const date = new Date();
    const greeting = this.parseTimeBasedGreetings(date.getHours());
    const name = this.user.contact.nickName || this.user.contact.firstName || this.defaultName;
    return `${greeting}, ${name}`;
  }

  private logError(err) {
    console.error(err);
  }

  public render() {
    return (
      <div class="greeting">
        <h3 class="font-size-large flush">{this.renderGreeting()}</h3>
        <p class="flush">This place was made for you!</p>
      </div>
    );
  }
}
