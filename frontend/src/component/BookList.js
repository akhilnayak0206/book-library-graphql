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
  if (loading) {
    return <h1>Loading...</h1>;
  }
  if (error) {
    return <h1>Oops seems like there is some error while getting data.</h1>;
  }
  return (
    <ul className='book-list'>
      {data.books &&
        data.books.map((data) => <li key={data.id}>{data.name}</li>)}
    </ul>
  );
}

export default BookList;
