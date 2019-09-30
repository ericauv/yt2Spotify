import { ApolloClient } from 'apollo-client';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { HttpLink } from 'apollo-link-http';
import { ApolloProvider } from '@apollo/react-hooks';
import ReactDOM from 'react-dom';
import { render } from 'react-dom';
import React from 'react';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';

const cache = new InMemoryCache();
const link = new HttpLink({
  uri: 'http://localhost:35050/',
});

const client = new ApolloClient({
  cache,
  link,
});

const Index = () => (
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>
);

render(<Index />, document.getElementById('root'));
