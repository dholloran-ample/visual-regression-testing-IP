import { ApolloClient } from 'apollo-client';
import { getApolloClient } from '../global/apollo';

export class CrdsApolloService {
  public static apolloClient: ApolloClient<{}>;

  public static subscribeToApolloClient(): Promise<ApolloClient<{}>> {
    const clientSubject = getApolloClient();
    return new Promise(resolve => {
      clientSubject.subscribe(client => {
        this.apolloClient = client;
        resolve(client);
      });
    });
  }
}
