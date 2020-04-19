import React from 'react';
import { gql } from 'apollo-boost';
import { useQuery } from '@apollo/react-hooks';

const getBookQuery = gql`
  {
    books {
      name
      genre
      id
    }
  }
`;

function BookList() {
  const { loading, error, data } = useQuery(getBookQuery);
  console.log(loading, error, data);
  return (
    <ul className='book-list'>
      <li>Book Name</li>
    </ul>
  );
}

export default BookList;
