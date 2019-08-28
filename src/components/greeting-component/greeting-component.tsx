import { Component, Prop, State, h } from '@stencil/core';
import axios from 'axios';
import { GreetingUser } from './greeting-component-interface';

@Component({
  tag: 'greeting-component',
  styleUrl: 'greeting-component.scss',
  shadow: true
})

export class GreetingComponent {
  private gqlUrl = process.env.CRDS_GQL_ENDPOINT;

  @State() user: GreetingUser = null;
  @Prop() authToken: string;

  public componentWillRender() {
    if (this.authToken && !this.user) {
      this.fetchUser(this.authToken);
    }
  }

  public renderGreeting() {
    if (this.user) {
      const greeting = `Welcome ${this.user.contact.nickName || this.user.contact.firstName || 'patron'}`
      return (
        <div>
          {greeting}
        </div>
      )
    }
  }

  public fetchUser(token) {
    return axios
      .post(
        this.gqlUrl,
        {
          query: `
            {
              user {
                contact {
                  firstName
                  nickName
                }
              }
            }`
        },
        {
          headers: {
            authorization: token
          }
        }
      )
      .then(success => {
        this.user = success.data.data.user;
      });
  }

  public render() {
    return (
      <div class="data-greeting">
        {this.renderGreeting()}
      </div>
    );
  }
}
