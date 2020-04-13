const express = require('express');

const graphqlHTTP = require('express-graphql');

const connectDB = require('./config/db');

const schema = require('./schema/schema');

// const path = require('path');

const app = express();

//Connect Database
connectDB();

//Init Middleware
app.use(express.json({ extended: false }));

//Define Routes
// app.use('/hello', require('./routes/api/hello')); //example
app.use('/graphql', graphqlHTTP({ schema, graphiql: true }));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
