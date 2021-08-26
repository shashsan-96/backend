const mongoose = require('mongoose');

const feedBackSchema = mongoose.Schema(
  {
    rate: {
      type:Number
    },
    message: {
      type: String
    },
    date:{
        type:Date
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model('FeedBack',feedBackSchema);