//Third-party package
const express = require("express");
const dotenv = require("dotenv");

// Custom Modules
const dbConnect = require('./src/config/db.config.js');
const customRouter = require('./src/routers/index.router.js');

//Express app initialization
const app = express();

//config
dotenv.config();

//middleware
app.use(express.json());
app.use(function(req, res, next){
  console.log(req.path, req.method);
  next();
});

// routes
app.use('/api', customRouter);

dbConnect();
const port = process.env.PORT

app.listen(port, () => {
    console.log(`Server Running on PORT ${port}`)
  });
  

