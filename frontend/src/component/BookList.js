import React, { useState } from 'react';
import { useQuery } from '@apollo/react-hooks';
import { getBookQuery } from '../queries/queries';
import BookDetails from './BookDetails';

function BookList() {
  const [selected, setSelected] = useState(null);

  const { loading, error, data } = useQuery(getBookQuery);
  if (loading) {
    return <h1>Loading...</h1>;
  }
  if (error) {
    return <h1>Oops seems like there is some error while getting data.</h1>;
  }
  return (
    <>
      <ul className='book-list'>
        {data.books &&
          data.books.map((data) => (
            <li key={data.id} onClick={(e) => setSelected(data.id)}>
              {data.name}
            </li>
          ))}
      </ul>
      <BookDetails bookId={selected} />
    </>
  );
}

export default BookList;
