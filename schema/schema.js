const graphql = require('graphql');
const _ = require('lodash');

//import models
const Book = require('../models/book');
const Author = require('../models/author');

const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLSchema,
  GraphQLID,
  GraphQLInt,
  GraphQLList,
  GraphQLNonNull,
} = graphql;

const BookType = new GraphQLObjectType({
  name: 'Book',
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    genre: { type: GraphQLString },
    author: {
      type: AuthorType,
      resolve(parent, args) {
        // if the data is stored inside the code then use loadash. i.e. use below commented code and comment mongoose find
        // return _.find(authors, { id: parent.authorId });
        return Author.findById(parent.authorId);
      },
    },
  }),
});

const AuthorType = new GraphQLObjectType({
  name: 'Author',
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    age: { type: GraphQLInt },
    books: {
      type: new GraphQLList(BookType),
      resolve(parent, args) {
        // if the data is stored inside the code then use loadash. i.e. use below commented code and comment mongoose find
        // return _.filter(books, { authorId: parent.id });
        return Book.find({ authorId: parent.id });
      },
    },
  }),
});

const RootQuery = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: {
    // name: book
    // @desc: find book
    // @query: {
    //   book(id: "insert_book_id") {
    //     id
    //      name
    //      genre
    //      author {
    //        id
    //        name
    //        age
    //        books {
    //          name
    //          genre
    //          id
    //        }
    //      }
    //  }
    // }
    book: {
      type: BookType,
      args: { id: { type: GraphQLID } },
      resolve(parent, args) {
        // code to get data from database
        // return _.find(books, { id: args.id });
        return Book.findById(args.id);
      },
    },

    // name: author
    // @desc: find author
    // @query: {
    //   author(id: "insert_author_id") {
    //     id
    //     name
    //     age
    //     books {
    //       name
    //       genre
    //       id
    //     }
    //   }
    // }
    author: {
      type: AuthorType,
      args: { id: { type: GraphQLID } },
      resolve(parent, args) {
        // return _.find(authors, { id: args.id });
        return Author.findById(args.id);
      },
    },

    // name: books
    // @desc: find all book
    // @query: {
    //   books{
    //     name
    //     genre
    //     id
    // author{
    //   name
    //   age
    //   id
    //     }
    //   }
    // }
    books: {
      type: new GraphQLList(BookType),
      resolve(parent, args) {
        return Book.find({});
      },
    },

    // name: authors
    // @desc: find all authors
    // @query: {{
    //   authors{
    //     name
    //     age
    //     id
    //     books {
    //       name
    //       genre
    //       id
    //     }
    //   }
    // }
    authors: {
      type: new GraphQLList(AuthorType),
      resolve(parent, args) {
        return Author.find({});
      },
    },
  },
});

const Mutation = new GraphQLObjectType({
  name: 'Mutation',
  fields: {
    // name: addAuthor
    // @desc: Add author. There is a limit of 50 author.
    //        If database has 50 authors no more can be added.
    //        Duplicate same names are not allowed since it has been set to unique in models/author
    // @query: mutation{
    // addAuthor(name:"add_name", age:add_age_integer){
    //   name
    //   age
    //   id
    // }
    // }
    // @errorName: Stupify
    addAuthor: {
      type: AuthorType,
      args: {
        name: { type: new GraphQLNonNull(GraphQLString) },
        age: { type: new GraphQLNonNull(GraphQLInt) },
      },
      async resolve(parent, args) {
        let author = new Author({
          name: args.name,
          age: args.age,
        });
        let count = await Author.estimatedDocumentCount();
        if (count >= 50) {
          const err = new Error();
          err.status = 507;
          err.errorMessage = 'Insufficient storage to add authors';
          err.errorName = 'Stupify';
          return err;
        } else {
          return author.save();
        }
      },
    },

    // name: addBook
    // @desc: Add Book. There is a limit of 50 books.
    //        If database has 50 books no more can be added.
    //        Duplicate same book names are not allowed since it has been set to unique in models/book
    // @query: mutation{
    //   addBook( name: "add_book_name", genre: "add_book_genre", authorId:"add_author_id" )
    //   {
    //     id
    //     name
    //     genre
    //     author{
    //       name
    //     age
    //     id
    //     }
    //   }
    // }
    // @errorName: Petrificus Totalus
    addBook: {
      type: BookType,
      args: {
        name: { type: new GraphQLNonNull(GraphQLString) },
        genre: { type: new GraphQLNonNull(GraphQLString) },
        authorId: { type: new GraphQLNonNull(GraphQLID) },
      },
      async resolve(parent, args) {
        let book = new Book({
          name: args.name,
          genre: args.genre,
          authorId: args.authorId,
        });
        let count = await Author.estimatedDocumentCount();
        if (count >= 50) {
          const err = new Error();
          err.status = 507;
          err.errorMessage = 'Insufficient storage to add Books';
          err.errorName = 'Petrificus Totalus';
          return err;
        } else {
          return book.save();
        }
      },
    },
  },
});

module.exports = new GraphQLSchema({
  query: RootQuery,
  mutation: Mutation,
});
