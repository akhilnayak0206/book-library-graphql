import { gql } from 'apollo-boost';

const getBookQuery = gql`
  {
    books {
      name
      genre
      id
    }
  }
`;

const getAuthorQuery = gql`
  {
    authors {
      name
      age
      id
    }
  }
`;

const addBookMutation = gql`
  mutation($name: String!, $genre: String!, $authorId: ID!) {
    addBook(name: $name, genre: $genre, authorId: $authorId) {
      name
      id
    }
  }
`;

const getBookDetailQuery = gql`
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

export { getBookDetailQuery, getAuthorQuery, getBookQuery, addBookMutation };
