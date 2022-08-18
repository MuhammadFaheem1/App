const express = require('express');
const cors = require('cors');

const app = express();
require('dotenv/config');
const api = process.env.API_URL;
const cns = process.env.CONNECTION_STRING;
const bodyParser = require ('body-parser');
const morgan = require('morgan');
const mongoose = require('mongoose');
const {User} = require('./model/user')
const authJwt = require('./helpers/jwt')

//middleware
app.use(bodyParser.json());
app.use(morgan('tiny'));

app.use(cors());
app.use(express.json());

// app.use(authJwt());

const usersRoutes = require('./routes/users');
app.use(`${api}/users`, usersRoutes);

// app.get("/", (req,res) => {
//   res.send(`hello everyone ${api}`);
// });

//datbaase connection
mongoose.connect(cns, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  dbName: 'jsAssignment'
}).then(() => {
  console.log("Database connection is ready ....");
}).catch((err) => {
  console.log(`Error: ${err}`);
});

//server
app.listen(3000), () => {
  console.log("server is running http://localhost:3000");
}

