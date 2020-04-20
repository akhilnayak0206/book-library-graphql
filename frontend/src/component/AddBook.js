import React, { useState } from 'react';
import { useQuery, useMutation } from '@apollo/react-hooks';
import {
  getAuthorQuery,
  addBookMutation,
  getBookQuery,
} from '../queries/queries';

const AddBook = () => {
  const [name, setName] = useState('');
  const [genre, setGenre] = useState('');
  const [authorId, setAuthorId] = useState('');

  const getAuthorsList = useQuery(getAuthorQuery);
  // eslint-disable-next-line no-unused-vars
  const [addBookHook, addBookData] = useMutation(addBookMutation, {
    variables: {
      name,
      genre,
      authorId,
    },
    refetchQueries: [{ query: getBookQuery }],
  });

  const displayAuthors = () => {
    const { loading, error, data } = getAuthorsList;

    if (loading) {
      return <option disabled>Loading Authors...</option>;
    } else if (error) {
      return <option disabled>Please refresh to get Authors...</option>;
    } else if (data) {
      return (
        data.authors &&
        data.authors.map((author) => {
          return (
            <option key={author.id} value={author.id}>
              {author.name}
            </option>
          );
        })
      );
    }
  };

  const submitForm = (e) => {
    e.preventDefault();
    addBookHook();
  };

  return (
    <form id='add-book' onSubmit={submitForm}>
      <div className='field'>
        <label>Book name:</label>
        <input type='text' onChange={(e) => setName(e.target.value)} />
      </div>
      <div className='field'>
        <label>Genre:</label>
        <input type='text' onChange={(e) => setGenre(e.target.value)} />
      </div>
      <div className='field'>
        <label>Author:</label>
        <select onChange={(e) => setAuthorId(e.target.value)}>
          <option>Select author</option>
          {displayAuthors()}
        </select>
      </div>
      <button>+</button>
    </form>
  );
};

export default AddBook;
