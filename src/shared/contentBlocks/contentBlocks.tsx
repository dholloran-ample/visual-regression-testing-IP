import { h } from '@stencil/core';
import { ApolloClient } from 'apollo-client';
import { GET_COPY } from './contentBlock.graphql';

export class ContentBlockHandler {
  private copy: ContentBlock[];
  private componentName: string;
  private apolloClient: ApolloClient<{}>;

  constructor(apolloClient: ApolloClient<{}>, componentName: string) {
    this.apolloClient = apolloClient;
    this.componentName = componentName;
  }

  public getCopy(): Promise<ContentBlock[]> {
    return this.apolloClient
      .query({ query: GET_COPY, variables: { componentName: this.componentName } })
      .then(response => {
        this.copy = response.data.contentBlocks;
        return response.data.contentBlocks;
      });
  }

  public getContentBlock(slug: string): HTMLDivElement {
    const contentBlock = this.copy.find(c => c.slug === slug);
    if (!contentBlock) return;
    return <div innerHTML={contentBlock.content.toString()} />;
  }
}

export interface ContentBlock {
  slug: string;
  content: string;
}
