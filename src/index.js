import React from 'react';
import ReactDOM from 'react-dom';
import ApolloClient from 'apollo-boost';
import { ApolloProvider } from '@apollo/react-hooks';

import 'semantic-ui-css/semantic.min.css'
import './index.css';

import App from './App';

const client = new ApolloClient({
  uri: 'http://localhost:5000/',
});

ReactDOM.render(
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>,
  document.getElementById('root')
);