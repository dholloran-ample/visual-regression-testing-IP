import { ApolloClient, DefaultOptions } from 'apollo-client';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { setContext } from 'apollo-link-context';
import { createHttpLink } from 'apollo-link-http';
import * as fetch from 'node-fetch';
import isNode from 'detect-node';
import { ReplaySubject } from 'rxjs';

export function InitApollo(authToken: string): void {
  const defaultOptions: DefaultOptions = {
    watchQuery: {
      fetchPolicy: 'no-cache'
    },
    query: {
      fetchPolicy: 'no-cache'
    }
  };

  const httpLink = createHttpLink({
    uri: process.env.CRDS_GQL_ENDPOINT,
    ...(isNode && { fetch: fetch })
  });

  const authLink = setContext((_, { headers }) => {
    return {
      headers: {
        ...headers,
        authorization: authToken
      }
    };
  });

  const apolloClient = new ApolloClient({
    link: authLink.concat(httpLink),
    defaultOptions: defaultOptions,
    cache: new InMemoryCache()
  });

  window['apolloClient'].next(apolloClient);
}

export function getApolloClient(): ReplaySubject<ApolloClient<{}>>  {
   return window['apolloClient'];
  }
}
