import React, { useEffect } from 'react';
import { useLazyQuery } from '@apollo/react-hooks';
import { GET_BOOK_DETAIL_QUERY } from '../queries/queries';
import '../styles/BookDetails.css';

const BookDetails = ({ bookId }) => {
  const [getDetailsExecute, bookDetail] = useLazyQuery(GET_BOOK_DETAIL_QUERY, {
    variables: {
      id: bookId,
    },
  });
  useEffect(() => {
    if (bookId) {
      return getDetailsExecute();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [bookId]);

  const displayBookDetails = () => {
    const { loading, data } = bookDetail;
    if (loading) {
      return <h1>Loading...</h1>;
    } else if (data) {
      const { book } = data;
      return (
        <>
          <h2 className='align-center'>{book.name}</h2>
          <p>
            Genre: <strong>{book.genre}</strong>
          </p>
          <p>
            Author: <strong>{book.author.name}</strong>
          </p>
          <p>All books by {book.author.name}:</p>
          <ul className='other-books'>
            {book.author.books.map((item) => {
              return <li key={item.id}>{item.name}</li>;
            })}
          </ul>
        </>
      );
    } else {
      return <div>Select a book for detailed view.</div>;
    }
  };

  return <div className='book-details'>{displayBookDetails()}</div>;
};

export default BookDetails;
