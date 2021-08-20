exports.allAccess = (req, res) => {
  res.status(200).send("Public Content.");
};

exports.userCont = (req, res) => {
  res.status(200).send("User Content.");
};

exports.adminCont = (req, res) => {
  res.status(200).send("Admin Content.");
};

