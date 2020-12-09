import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import {
  ApolloClient,
  ApolloProvider,
  HttpLink,
  InMemoryCache
} from '@apollo/client';

const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: new HttpLink({
    uri: 'http://localhost:4000'
  })
});

const WithApolloClient = (AppComponent) => (
  <ApolloProvider client={client}>
    <AppComponent/>
  </ApolloProvider>
);

ReactDOM.render(WithApolloClient(App), document.getElementById('root'));
