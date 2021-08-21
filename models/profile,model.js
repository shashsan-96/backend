const mongoose = require('mongoose');

const profilePictureSchema = mongoose.Schema(
  {
    owner: {
      type: mongoose.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    fileId: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('ProfilePicture', profilePictureSchema);