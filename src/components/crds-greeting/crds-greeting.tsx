import { Component, Prop, State, h } from '@stencil/core';
import { GreetingUser } from './crds-greeting-interface';
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
      firstName: '',
      nickName: ''
    }
  };
  @Prop() authToken: string;
  @Prop() defaultName: string;

  public componentWillLoad() {
    this.apolloClient = CrdsApollo(this.authToken);
    return this.getUserName()
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
    let greetingText;
    if (hour < 12) {
      greetingText = 'Good morning';
    } else if (hour >= 12) {
      greetingText = 'Good afternoon' 
    } else if (hour >= 17) {
      greetingText = 'Good evening'
    }
    return greetingText;
  }

  public renderGreeting() {
    const time = new Date();
    const greeting = this.parseTimeBasedGreetings(time);
    const name = this.user.contact.nickName || this.user.contact.firstName || this.defaultName;
    return `${greeting}, ${name}`;
  }

  private logError(err) {
    console.error(err);
  }

  public render() {
    return (
      <div class="push-bottom">
        <h3 class="font-size-large flush">{this.renderGreeting()}</h3>
        <p class="flush">This place was made for you!</p>
      </div>
    );
  }
}
