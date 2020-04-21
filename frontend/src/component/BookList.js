import React, { useState } from 'react';
import { useQuery } from '@apollo/react-hooks';
import { GET_BOOK_QUERY } from '../queries/queries';
import BookDetails from './BookDetails';
import '../styles/BookList.css';
const BookList = () => {
  const [selected, setSelected] = useState(null);

  const { loading, error, data } = useQuery(GET_BOOK_QUERY);

  const displayData = () => {
    if (loading) {
      return <h1>Loading...</h1>;
    } else if (error) {
      return <h1>Please Refresh the Page.</h1>;
    } else if (data.books) {
      return (
        <ul className='book-list'>
          {data.books.map((data) => (
            <li key={data.id} onClick={(e) => setSelected(data.id)}>
              {data.name}
            </li>
          ))}
        </ul>
      );
    }
  };
  return (
    <>
      {displayData()}
      <BookDetails bookId={selected} />
    </>
  );
};

export default BookList;
