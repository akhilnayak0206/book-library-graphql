const express = require('express');
const graphqlHTTP = require('express-graphql');
const cors = require('cors');
// const path = require('path');

const connectDB = require('./config/db');
const schema = require('./schema/schema');

const app = express();

// CORS
app.use(cors());

//Connect Database
connectDB();

//Init Middleware
app.use(express.json({ extended: false }));

//Define Routes
app.use(
  '/graphql',
  graphqlHTTP({
    schema,
    graphiql: true,
    customFormatErrorFn: (err) => ({
      //   console.log(err); // print it out
      originalError: err.originalError,
      message: err.message,
      path: err.path,
    }),
  })
);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
