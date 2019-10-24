import { Component, Element, h, Prop, State, Watch } from '@stencil/core';
import { HTMLStencilElement } from '@stencil/core/internal';
import ApolloClient from 'apollo-client';
import { TitheUser } from './crds-tithe-challenge.interface';
import { ContentBlockHandler } from '../../shared/contentBlocks/contentBlocks';
import { CrdsApollo } from '../../shared/apollo';
import { GET_DONATIONS, GET_USER_GROUPS } from './crds-tithe-challenge.graphql';

@Component({
  tag: 'crds-tithe-challenge',
  styleUrl: 'crds-tithe-challenge.scss',
  shadow: true
})
export class CrdsTitheChallenge {
  private apolloClient: ApolloClient<{}> = null;
  private contentBlockHandler: ContentBlockHandler;
  private feelings: any[] = [
    { text: 'Blessed', href: '' },
    { text: 'Discouraged', href: '' },
    { text: 'Nervous', href: '' },
    { text: 'Meh', href: '' },
    { text: 'Hopeful', href: '' },
    { text: 'Excited', href: '' }
  ];

  @State() user: TitheUser = null;
  @Prop() authToken: string;
  @Prop() selectedFeeling: string;
  @Element() public host: HTMLStencilElement;

  @Watch('authToken')
  authTokenHandler(newValue: string, oldValue: string) {
    if (newValue !== oldValue) {
      this.apolloClient = CrdsApollo(newValue);
      this.getUser();
    }
  }

  public componentWillLoad() {
    this.apolloClient = CrdsApollo(this.authToken);
    this.contentBlockHandler = new ContentBlockHandler(this.apolloClient, 'tithe challenge');
    return this.contentBlockHandler.getCopy();
  }

  public componentWillRender() {
    console.log(this.user);
    if (!this.isUserInChallenge()) return; //exit because we cant do anything else at this point
    if (!this.user.donations) return this.getUserDonations();
  }

  public getUser() {
    return this.apolloClient.query({ query: GET_USER_GROUPS }).then(response => {
      console.log(response);
      this.user = response.data.user;
    });
  }

  public getUserDonations() {
    return this.apolloClient
      .query({
        variables: { startDate: this.user.groups[0].userStartDate },
        query: GET_DONATIONS
      })
      .then(response => {
        this.user.donations = response.data.user.donations;
        console.log(this.user.donations);
      });
  }

  private isUserActive() {
    return this.user.donations.length;
  }

  private isUserInChallenge() {
    return this.user && this.user.groups.length;
  }

  private handleFeelingSelected(event) {
    //fire to graphql/cosmos
    this.selectedFeeling = event.target.value;
  }

  public render() {
    if (!this.shouldShowComponent()) return null;
    return (
      <div>
        <img src="https://www.google.com/url?sa=i&url=https%3A%2F%2Fwolper.com.au%2Fwolpers-new-coffee-cart%2Fimage-placeholder%2F&psig=AOvVaw1DnAtouBgZ0b8uMlA9FJvf&ust=1572032062564000&source=images&cd=vfe&ved=0CAIQjRxqFwoTCNij8vfRteUCFQAAAAAdAAAAABAD" />
        {this.isUserActive() ? this.renderStarted() : this.renderNotStarted()}
      </div>
    );
  }

  public renderStarted() {
    return (
      <div>
        <div>{this.contentBlockHandler.getContentBlock('tithe-started', { name: this.user.nickName })}</div>
        {this.selectedFeeling ? this.renderFeelingResponse() : this.renderFeelingSelection()}
      </div>
    );
  }

  public renderFeelingSelection() {
    return (
      <div>
        I'm feeling
        <select class="dropdown" onInput={event => this.handleFeelingSelected(event)}>
          {this.feelings.map(option => (
            <option value={option.text} data-name={option.text}>
              {option.text}
            </option>
          ))}
        </select>
      </div>
    );
  }

  public renderNotStarted() {
    return (
      <div>
        <div>{this.contentBlockHandler.getContentBlock('tithe-encourage', { name: this.user.nickName })}</div>
        <button
          onClick={() => {
            window.location.href = '/give';
          }}
        >
          Schedule your tithe now
        </button>
        <button
          onClick={() => {
            console.log('redirect to brians message from 10/27');
          }}
        >
          Message from Brian
        </button>
        <a href="">What's the 90 day challenge?</a>
      </div>
    );
  }

  public renderFeelingResponse() {
    return this.contentBlockHandler.getContentBlock(`feelingResponse${this.selectedFeeling}`);
  }

  private shouldShowComponent(): boolean {
    return this.user && !!this.user.groups.length;
  }
}
