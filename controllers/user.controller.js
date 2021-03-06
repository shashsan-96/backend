const db = require("../models");
const user= db.user;



//find user details
exports.findOne = (req, res) => {
  const id = req.params.id;
  user.findById(id)
    .then(data => {
      if (!data)
        res.status(404).send({ message: "Not found User with id " + id });
      else res.send(data);
    })
    .catch(err => {
      res
        .status(500)
        .send({ message: "Error retrieving User with id=" + id });
    });
};

// Update 
exports.update = (req, res) => {
  if (!req.body) {
    return res.status(400).send({
      message: "Data to update can not be empty!"
    });
  }
  const {file} = req
  console.log(file)
  const id = req.params.id;

  user.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
    .then(data => {
      
      if (!data) {
        res.status(404).send({
          message: `Cannot update  with id=${id}. Maybe user was not found!`
        });
      } else 
      {
        data.username =  req.body.username
        data.email =  req.body.email
        data.username = req.body.username
        data.firstname =  req.body.firstname
        data.lastname =  req.body.lastname
        data.mobile =  req.body.mobile 
        data.address =  req.body.address
        data.zip =  req.body.zip 
        data.city =  req.body.city 
        data.country =  req.body.country
        data.profilePic =  req.file.filename

        
        data.save()
        .then(()=>res.json("updated succesfully")).catch(err=>{res.status(500).send({
          message: "Error updating" 
        })})

      }
      

    })
    .catch(err => {
      res.status(500).send({
        message: "Error updating user with id=" + id
      });
    });
};

// Delete
exports.delete = (req, res) => {
  const id = req.params.id;
  user.findByIdAndRemove(id, { useFindAndModify: false })
    .then(data => {
      if (!data) {
        res.status(404).send({
          message: `Cannot delete user with id=${id}. Maybe userwas not found!`
        });
      } else {
        res.send({
          message: "user was deleted successfully!"
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Could not delete user with id=" + id
      });
    });
};



exports.userCont = (req, res) => {
  res.status(200).send("User Content.");
};

exports.adminCont = (req, res) => {
  res.status(200).send("Admin Content.");
};

