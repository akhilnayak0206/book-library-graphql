import { gql } from 'apollo-boost';

const GET_BOOK_QUERY = gql`
  {
    books {
      name
      genre
      id
    }
  }
`;

const GET_AUTHOR_QUERY = gql`
  {
    authors {
      name
      age
      id
    }
  }
`;

const ADD_BOOK_MUTATION = gql`
  mutation($name: String!, $genre: String!, $authorId: ID!) {
    addBook(name: $name, genre: $genre, authorId: $authorId) {
      name
      id
    }
  }
`;

const GET_BOOK_DETAIL_QUERY = gql`
  query($id: ID!) {
    book(id: $id) {
      id
      name
      genre
      author {
        id
        name
        age
        books {
          name
          id
        }
      }
    }
  }
`;

export {
  GET_BOOK_DETAIL_QUERY,
  GET_AUTHOR_QUERY,
  GET_BOOK_QUERY,
  ADD_BOOK_MUTATION,
};
