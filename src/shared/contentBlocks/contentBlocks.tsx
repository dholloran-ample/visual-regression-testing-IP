import { h, State } from '@stencil/core';
import { ApolloClient } from 'apollo-client';
import { GET_COPY } from './contentBlock.graphql';

export class ContentBlockHandler {
  private copy: ContentBlock[] = [];
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

  public getContentBlock(slug: string, replace?: { [key: string]: string }): HTMLDivElement {
    if (!this.copy) return null;
    var contentBlock = this.copy.find(c => c.slug === slug);
    if (!contentBlock) return;
    if (replace)
    Object.keys(replace).forEach(key => {
      contentBlock.content = contentBlock.content.replace(`{${key}}`, replace[key]);
    });
    return <div innerHTML={contentBlock.content.toString()} />;
  }

  public getContentBlocksBySlugPartial(slugPartial: string): ContentBlock[] {
    if (!this.copy) return null;
    let foundBlocks: ContentBlock[] = [];
    this.copy.map(block => {
      if (block.slug.includes(slugPartial)){
        foundBlocks.push(block);
      }
    })
    return foundBlocks;
  }
}

export interface ContentBlock {
  slug: string;
  content: string;
  title: string;
}
