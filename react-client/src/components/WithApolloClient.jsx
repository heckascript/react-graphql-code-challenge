import React from 'react';
import {
  ApolloClient,
  ApolloProvider,
  HttpLink,
  InMemoryCache
} from '@apollo/client';

export const URI = 'http://localhost:4000';

function WithApolloClient(AppComponent) {
  const client = new ApolloClient({
    cache: new InMemoryCache(),
    link: new HttpLink({
      uri: URI
    })
  });

  const WrappedComponent = props => {
    return (
      <ApolloProvider client={client}>
        <AppComponent {...props}/>
      </ApolloProvider>
    );
  }

  return <WrappedComponent />;
};

export default WithApolloClient;
