import { Component, Element, h, Prop } from '@stencil/core';
import { HTMLStencilElement } from '@stencil/core/internal';
import ApolloClient from 'apollo-client';
import { TitheUser } from './crds-tithe-challenge.interface';
import { ContentBlockHandler } from '../../shared/contentBlocks/contentBlocks';
import { CrdsApollo } from '../../shared/apollo';

@Component({
  tag: 'crds-tithe-challenge',
  styleUrl: 'crds-tithe-challenge.scss',
  shadow: true
})
export class CrdsTitheChallenge {
  private apolloClient: ApolloClient<{}> = null;
  private user: TitheUser = null;
  private contentBlockHandler: ContentBlockHandler;

  @Prop() authToken: string;
  @Element() public host: HTMLStencilElement;

  public componentWillLoad() {
    this.apolloClient = CrdsApollo(this.authToken);
    this.contentBlockHandler = new ContentBlockHandler(this.apolloClient, 'tithe challenge');
    var promises = [this.contentBlockHandler.getCopy()];
    return Promise.all(promises);
  }

  public componentWillRender() {
    this.mockUser();
    console.log(this.contentBlockHandler);
  }

  public render() {
    if (!this.shouldShowComponent()) return null;

    if (this.user.status === "active") {
      return this.renderStarted();
    } else {
      return this.renderEncouragement();
    }
  }

  public renderStarted() {
    return (
      <div>
        {this.contentBlockHandler.getContentBlock('tithe-started', { name: this.user.name })}
      </div>
    );
  }

  public renderEncouragement() {
    return (
      <div>
        {this.contentBlockHandler.getContentBlock('tithe-encourage', { name: this.user.name })}
      </div>
    );
  }

  private mockUser() {
    this.user = {
      name: 'Coach',
      start: new Date(),
      challengeMember: true,
      started: false,
      status: "joined"
    };
    this.authToken = 'fake';
  }

  private shouldShowComponent(): boolean {
    return !!this.user.challengeMember && this.user.status !== "done";
  }
}
