import React from 'react';
import ApolloClient from 'apollo-boost';
import BookList from './component/BookList';
import { ApolloProvider } from '@apollo/react-hooks';
import './App.css';

//apollo setup
const client = new ApolloClient({
  uri: 'http://localhost:5000/graphql',
});

function App() {
  return (
    <ApolloProvider client={client}>
      <h1 className='Center'>Book Library</h1>
      <BookList />
    </ApolloProvider>
  );
}

export default App;
