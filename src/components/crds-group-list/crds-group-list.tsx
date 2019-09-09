import { Component, Prop, State, Element, Watch, h } from '@stencil/core';
import ApolloClient from 'apollo-client';
import { CrdsApollo } from '../../shared/apollo';
import { GroupUser } from './crds-group-list.interface';
import { HTMLStencilElement } from '@stencil/core/internal';

@Component({
  tag: 'crds-group-list',
  styleUrl: 'crds-group-list.scss',
  shadow: true
})
export class CrdsGroupList {
  private apolloClient: ApolloClient<{}>;

  @State() user: GroupUser = {};
  @Prop() authToken: string;
  @Element() public host: HTMLStencilElement

  @Watch('authToken')
  authTokenHandler(newValue: string, oldValue: string){
    if (newValue !== oldValue){
      this.apolloClient = CrdsApollo(newValue);
    }
  }

  public render() {
    return (
      <div>
        <p>Hey yo</p>
      </div>
    )
  }
}
