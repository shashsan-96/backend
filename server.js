const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const app = express();

let corsOptions = {
    origin: "http://localhost:3000"
  };

  app.use(cors(corsOptions));
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  
const PORT = 8000;
const DB_URL ='mongodb+srv://akura:akura123@akura.i7ooo.mongodb.net/akuraOnline?retryWrites=true&w=majority';

mongoose.connect(DB_URL,{
    useNewUrlParser:true,
    useUnifiedTopology:true
})


.then(() =>{
    console.log('DB connected');
    initial();
})
.catch((err) => console.log('DB connection error',err));

app.listen(PORT, () =>{

    console.log(`App is running on ${PORT}`);
});


const db = require("./models");
const Role = db.role;



app.get("/", (req, res) => {
    res.json({ message: "Welcome" });
  });
  

  require("./routes/auth.routes")(app);
  require("./routes/user.routes")(app);
  


  function initial() {
    Role.estimatedDocumentCount((err, count) => {
      if (!err && count === 0) {
        new Role({
          name: "user"
        }).save(err => {
          if (err) {
            console.log("error", err);
          }
  
          console.log("added 'user' to roles collection");
        });
  
        new Role({
          name: "admin"
        }).save(err => {
          if (err) {
            console.log("error", err);
          }
  
          console.log("added 'admin' to roles collection");
        });
      }
    });
  }
  
