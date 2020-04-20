import React, { useEffect } from 'react';
import { useLazyQuery } from '@apollo/react-hooks';
import { getBookDetailQuery } from '../queries/queries';

const BookDetails = ({ bookId }) => {
  const [getDetailsExecute, bookDetail] = useLazyQuery(getBookDetailQuery, {
    variables: {
      id: bookId,
    },
  });
  useEffect(() => {
    if (bookId) {
      // eslint-disable-next-line react-hooks/exhaustive-deps
      return getDetailsExecute();
    }
  }, [bookId]);

  const displayBookDetails = () => {
    const { loading, data } = bookDetail;
    if (loading) {
      return <h1>Loading...</h1>;
    } else if (data) {
      const { book } = data;
      return (
        <>
          <h2>{book.name}</h2>
          <p>{book.genre}</p>
          <p>{book.author.name}</p>
          <p>All books by this author:</p>
          <ul className='other-books'>
            {book.author.books.map((item) => {
              return <li key={item.id}>{item.name}</li>;
            })}
          </ul>
        </>
      );
    } else {
      return <div>No book selected...</div>;
    }
  };

  return <div id='book-details'>{displayBookDetails()}</div>;
};

export default BookDetails;
