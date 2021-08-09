const express = require('express')
const app = express()
const router = express.Router()
const mongoose = require('mongoose')

app.use(express.json());
app.use(router)
const PORT = 5000
const DB_URL = "mongodb+srv://prakhar:201951116@cluster0.29cka.mongodb.net/myFirstDatabase?retryWrites=true&w=majority"

require('./models/user')
require('./models/product')
require('./models/order')

app.use(require('./routes/user'))
app.use(require('./routes/buyer'))
app.use(require('./routes/seller'))


const connect = (url = DB_URL, opts = {}) => {
    return mongoose.connect(url, {
      ...opts,
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
  });
};


const start = async () => {
    try {
      await connect();
      app.listen(PORT, () => {
        console.log(`REST API on http://localhost:${PORT}/`);
      });
    } catch (e) {
      console.error(e);
  }
};
  
start();
