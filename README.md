# Book-Library-GraphQL

This is a website to add books in book library and find other books by that author.  
This is a **MERN** and **GraphQL** project hosted with the help of **heroku**.  
The Back End is made using **NodeJS & ExpressJS** using **MongoDB** as database and **GraphQL** for querying.  
The Front End is made using **ReactJS**, **Apollo** and **GraphQL**.

## Quick Start

```bash
# Install backend dependencies
npm install

# Install frontend dependencies
cd frontend
npm install
```

```javascript
// Make folder config
// Inside config make db.js
// Add below code
const mongoose = require('mongoose');

const config = require('config');

const db = config.get('mongoURI');

const connectDB = async () => {
  try {
    await mongoose.connect(db, {
      useNewUrlParser: true,
      useCreateIndex: true,
      useFindAndModify: false,
      useUnifiedTopology: true
    });
    console.log('MongoDB Connected...');
  } catch (err) {
    console.log('Error connectDB', err.message);
    //Exit when failed
    process.exit(1);
  }
};

//Remove this in production.
// To get logs every time request are made.
// mongoose.set('debug', true);

module.exports = connectDB;

```

```javascript
// Inside config make default.json
// Add below code with your credential
{
  "mongoURI": "mongodb+srv://your_username:your_password@your_cluster_name.mongodb.net/book-library-graphql?retryWrites=true&w=majority"
}

```

```bash
# Run both Backend & Frontend from root
npm run dev
```

## Packages Installed

### These are the list of packages used in Back End

- config
- cors
- express
- express-graphql
- mongoose
- lodash
- mongoose

**Express** is used with NodeJS to divert users to different parts of the web applications based on the request made.  
**Mongoose** represents a much cleaner interface for querying MongoDB.  
**Express-graphql** is a GraphQL HTTP server middleware.  
**config** lets you define a set of default parameters, and extend them for different deployment environments.  
**cors** is a node.js package for providing a Connect/Express middleware that can be used to enable CORS with various options.  
**lodash** makes JavaScript easier by taking the hassle out of working with arrays, numbers, objects, strings, etc.  
**GraphQL** is a language that enables you to provide a complete and understandable description of the data in your API.  Furthermore it gives clients the power to ask for exactly what they need and nothing more.  

**Note:** _I have limited the number of authors and books to **50 counts**, to avoid any malicious activities ._

### These are the list of packages used in Front End

- react
- react-router-dom
- GraphQL
- apollo-boost
- @apollo/react-hooks

**React** is a JavaScript library for building user interfaces.  
**GraphQL** is a language that enables you to provide a complete and understandable description of the data in your API. Furthermore it gives clients the power to ask for exactly what they need and nothing more.  
**apollo-boost** is a zero-config way to start using Apollo Client.  
**@apollo/react-hooks** is used to make calls like useQuery, useMutation, useLazyQuery, etc.  

## Project Info

### Author

> Akhil Nayak

### License

> This project is licensed under the [MIT](https://choosealicense.com/licenses/mit/) License.

### Special Thanks

>Thanks The Net Ninja for helping me with GraphQL.

#### If you have any suggestion or doubt do let me know

#### ThankYou.Peace
