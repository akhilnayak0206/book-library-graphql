import React, { useState, useEffect } from 'react';
import { useQuery, useMutation } from '@apollo/react-hooks';
import {
  GET_AUTHOR_QUERY,
  ADD_BOOK_MUTATION,
  GET_BOOK_QUERY,
} from '../queries/queries';
import '../styles/AddBook.css';

const AddBook = () => {
  const [name, setName] = useState('');
  const [genre, setGenre] = useState('');
  const [authorId, setAuthorId] = useState('');
  const [showForm, setShowForm] = useState(false);

  const getAuthorsList = useQuery(GET_AUTHOR_QUERY);
  // eslint-disable-next-line no-unused-vars
  const [addBookHook, addBookData] = useMutation(ADD_BOOK_MUTATION, {
    variables: {
      name,
      genre,
      authorId,
    },
    refetchQueries: [{ query: GET_BOOK_QUERY }],
  });

  useEffect(() => {
    if (showForm) {
      setName('');
      setGenre('');
      setAuthorId('select');
      setShowForm(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [addBookData.data]);

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

  const displayMutationError = () => {
    if (addBookData.loading) {
      return <p className='loading'>Book getting added to database...</p>;
    } else if (addBookData.error) {
      return <p className='error'>Error adding book to database.</p>;
    } else {
      return;
    }
  };

  const submitForm = (e) => {
    e.preventDefault();
    addBookHook().catch((err) => console.log(err));
  };

  return (
    <>
      {showForm ? (
        <form onSubmit={submitForm}>
          <div className='field'>
            <label>Book name:</label>
            <input
              type='text'
              onChange={(e) => setName(e.target.value)}
              value={name}
            />
          </div>
          <div className='field'>
            <label>Genre:</label>
            <input
              type='text'
              onChange={(e) => setGenre(e.target.value)}
              value={genre}
            />
          </div>
          <div className='field'>
            <label>Author:</label>
            <select
              onChange={(e) => setAuthorId(e.target.value)}
              value={authorId}
            >
              <option value={'select'}>Select author</option>
              {displayAuthors()}
            </select>
          </div>
          {displayMutationError()}
          <div className='form-buttons'>
            <button
              type='button'
              onClick={(e) => {
                // e.stopPropagation();
                // e.preventDefault();
                setShowForm(false);
              }}
            >
              {' '}
              Cancel
            </button>
            <button
              type='submit'
              // onClick={() => submitForm()}
            >
              {' '}
              Add Book
            </button>
          </div>
        </form>
      ) : (
        <button className='button-show' onClick={() => setShowForm(true)}>
          +
        </button>
      )}
    </>
  );
};

export default AddBook;
