const feed = require("../models/feed.model");


// Create and Save 
exports.create = (req, res) => {
    if (!req.body.rate) {
      res.status(400).send({ message: "Content can not be empty!" });
      return;
    }
  
    // Create 
    const feedBack = new feed({
      rate: req.body.rate,
      message: req.body.message,
      date: req.body.date
    });
  
    // Save to the database
    feedBack
      .save(feedBack)
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while creating ."
        });
      });
  };
  
  // Retrieve all.
exports.findAll = (req, res) => {
   
    feed.find()
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving."
        });
      });
  };



// Delete by id
exports.delete = (req, res) => {
    const id = req.params.id;
    feed.findByIdAndRemove(id, { useFindAndModify: false })
      .then(data => {
        if (!data) {
          res.status(404).send({
            message: `Cannot delete feedBack with id=${id}.  not found!`
          });
        } else {
          res.send({
            message: "feedBack was deleted successfully!"
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Could not delete" 
        });
      });
  };
  


exports.deleteAll = (req, res) => {
    feed.deleteMany()
      .then(data => {
        if (!data) {
          res.status(404).send({
            message: `Cannot delete feedBack with id=${id}.  not found!`
          });
        } else {
          res.send({
            message: "feedBack was deleted successfully!"
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Could not delete" 
        });
      });
  };