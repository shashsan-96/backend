
//declare constant variable for assign dependencies

import dotenv from 'dotenv';
import productRouter from './routers/productRouter.js';
import userRouter from './routers/userRouter.js';
import orderRouter from './routers/orderRouter.js';


const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');//allow different
const app = express();

//import routes (stationery.js) and  asign to variable
const stationeryRoutes= require('./routes/stationery');

//
app.use('uploads',express.static('uploads'))

//app middlewear
app.use(bodyParser.json());
app.use(cors());
//new

//stationery.js request by url 
app.use(stationeryRoutes);

// define port of the server
const PORT = 8000;
//db url  asign to a variable
const DB_URL ='mongodb+srv://gamini:gamini123@stationery.eseei.mongodb.net/stationery?retryWrites=true&w=majority';

//connect to the mongodb from this application
mongoose.connect(DB_URL,{
    useNewUrlParser:true,
    useUnifiedTopology:true,
    useCreateIndex: true,
});
app.use('/api/users', userRouter);
app.use('/api/products', productRouter);
app.use('/api/orders', orderRouter);
app.get('/api/config/paypal', (req, res) => {
  res.send(process.env.PAYPAL_CLIENT_ID || 'sb');
});
app.get('/', (req, res) => {
  res.send('Server is ready');
})


//if successfuly connected msg to console


.then(() =>{
    console.log('DB connected');
})

//if unsuccsessfull
.catch((err) => console.log('DB connection error',err));

// listn to the port 
app.listen(PORT, () =>{

    console.log(`App is running on ${PORT}`);

});


