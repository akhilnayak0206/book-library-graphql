const express = require('express');
const graphqlHTTP = require('express-graphql');
const cors = require('cors');
const path = require('path');

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

// Serve static assets i.e. React(Front End) build folder in production
if (process.env.NODE_ENV === 'production') {
  //Set static folder
  app.use(express.static('frontend/build'));

  app.get('/*', (req, res) => {
    res.sendFile(path.join(__dirname, './frontend/build/index.html'));
    // changed the above line from path.res(__dirname, 'frontend', 'build', 'index.html')); to allow reloading of the site & load through URL if react-router-dom is added for routing.
  });
}

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
