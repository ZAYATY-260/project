const express = require('express')
// const session = require('express-session')
const path = require('path')
const app = express()
const port = 3000;


const index_router = require('./routes/index.js');


//setup json middleware
app.use(express.json());

// Session middleware
// app.use(session(
// {
//     secret: 'zayaty', // Change this to a random string
//     resave: false,
//     saveUninitialized: true
// }));

//use ejs filesystem 
app.set("view engine", "ejs");

//setup static folder for serving static files in Express
app.use(express.static(path.join(__dirname, "public")));

// view engine setup
app.set("views", path.join(__dirname, "views"));

//setup routes
app.use("/"  , index_router);


// Handling other errors
app.use((err, req, res, next) => 
{
    console.error(err.stack);
    res.status(500).send('Something went wrong!');
});
  
// Server startup message if everything is fine
const server = app.listen(port, () => 
{
    console.log('Happy coding, engineer!');
    console.log(`Server is running at http://localhost:${port}`);
});
  
// Handling errors during server startup
server.on('error', (error) => {
    if (error.syscall !== 'listen') {
      throw error;
    }
  
    switch (error.code) {
      case 'EACCES':
        console.error(`Port ${port} requires elevated privileges`);
        process.exit(1);
        break;
      case 'EADDRINUSE':
        console.error(`Port ${port} is already in use`);
        process.exit(1);
        break;
      default:
        throw error;
    }
});
