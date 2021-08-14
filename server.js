const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();

const PORT = 8000;
const DB_URL ='mongodb+srv://akura:akura123@akura.i7ooo.mongodb.net/akuraOnline?retryWrites=true&w=majority';

mongoose.connect(DB_URL,{
    useNewUrlParser:true,
    useUnifiedTopology:true
})


.then(() =>{
    console.log('DB connected');
})
.catch((err) => console.log('DB connection error',err));

app.listen(PORT, () =>{

    console.log(`App is running on ${PORT}`);
});


