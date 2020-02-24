import React from 'react';
import ReactDOM from 'react-dom';
import ApolloClient, { gql } from 'apollo-boost';

import 'semantic-ui-css/semantic.min.css'
import './index.css';

import App from './App';

const client = new ApolloClient({
  uri: 'http://localhost:5000/',
});

client
  .query({
    query: gql`
      {
        characters(name: "Rick", gender: "", status: "") {
          id name gender status image
        }
      }
    `
  })
  .then(result => console.log(result));

ReactDOM.render(<App />, document.getElementById('root'));