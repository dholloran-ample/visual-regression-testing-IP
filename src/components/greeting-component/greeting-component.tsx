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

  public renderGreeting() {
    if (this.user) {
      const greeting = `Welcome ${this.user.contact.nickName || this.user.contact.firstName || 'patron'}`;
      return <div>{greeting}</div>;
    }
  }

  public init() {
    if(this.authToken)
      return Promise.all([this.getUserName()]);
  }

  // This lets unit tests capture and confirm errors rather than listening in on console.error
  private logError(err) {
    console.error(err);
  }

  /** GraphQL I/O **/

  public getUserName() {
    return this.apolloClient
      .query({ query: GET_NAMES })
      .then(success => {
        console.log(success);
        this.user = success.data.data.user;
      })
      .catch(err => {
        this.logError(err);
      });
  }

  public render() {
    return <div class="data-greeting">{this.renderGreeting()}</div>;
  }
}
