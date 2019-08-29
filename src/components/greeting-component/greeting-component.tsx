import { Component, Prop, State, h } from '@stencil/core';
import { GreetingUser } from './greeting-component-interface';
import { GET_NAMES } from './greeting-component.graphql';
import ApolloClient from 'apollo-client';
import { CrdsApollo } from '../../shared/apollo';

@Component({
  tag: 'greeting-component',
  styleUrl: 'greeting-component.scss',
  shadow: true
})
export class GreetingComponent {
  private apolloClient: ApolloClient<{}>;

  @State() user: GreetingUser;
  @Prop() authToken: string;

  public componentWillRender() {
    if (this.authToken && !this.user) {
      this.getUserName();
    }
  }

  public componentWillLoad() {
    this.apolloClient = CrdsApollo(this.authToken);
    return this.init();
  }

  public init() {
    if (this.authToken) return Promise.all([this.getUserName()]);
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

  public renderGreeting() {
    if (this.user) {
      const greeting = `Welcome ${this.user.contact.nickName || this.user.contact.firstName || 'patron'}`;
      return <div>{greeting}</div>;
    }
  }

  private logError(err) {
    console.error(err);
  }

  public render() {
    return <div class="data-greeting">{this.renderGreeting()}</div>;
  }
}
