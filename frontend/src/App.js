import React from 'react';
import ApolloClient from 'apollo-boost';
import BookList from './component/BookList';
import AddBook from './component/AddBook';
import { ApolloProvider } from '@apollo/react-hooks';
import './App.css';

//apollo setup
const client = new ApolloClient({
  uri: '/graphql', // use this when deployed
  // uri: 'http://localhost:5000/graphql', //if you want to run this site locally
});

const App = () => {
  return (
    <ApolloProvider client={client}>
      <div className='main'>
        <h1>Book Library</h1>
        <BookList />
        <AddBook />
      </div>
    </ApolloProvider>
  );
};

export default App;
