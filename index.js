//server side
require('dotenv').config();
const express = require('express');
const mongoose= require('mongoose');
const dbcloud = require('./config/keys').mongoURI; //used to mongoURI because the file is in json format
const app = express();
const handle = require('./handlers');
const bodyParser= require('body-parser');
const port=process.env.PORT;
const db=('./models');
const routes = require('./routes');


//it is used to interract with the server
const cors = require('cors');
//import all the dependencies
 app.use(cors());
 app.use(bodyParser.json());

 //mongoose to use the data base connection and add db to call the database
 mongoose.connect(dbcloud,{ useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true })
 .then(() => console.log("MongoDB successfully connected"))
 .catch(err => console.log(err));

 //just for run purpose
app.get('/', (req,res)=>{res.json({hello:"world"})});
app.use('/api/auth',routes.auth);

app.use('/api/polls',routes.poll);
//if page not found
app.use(handle.notFound);

//server crash
app.use(handle.errors)


//server port assign
app.listen(port,console.log(`server run at port ${port}`));
