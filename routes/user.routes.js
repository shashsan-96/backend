const { authJwt } = require("../middlewares");
const controller = require("../controllers/user.controller");
const fd = require("../controllers/feedBack.controller");
const multer = require("multer")
const path = require("path");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
      
      cb(null,path.join(__dirname,'../public'))
  },

  filename: (req, file, cb) => {
      cb(null,Date.now() + path.extname(file.originalname));
  }
})
const upload = multer({storage:storage});





module.exports = function (app) {
  app.use(function (req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });



  app.get("/api/shop/user", [authJwt.verifyToken], controller.userCont);
  app.get("/api/shop/user/:id", [authJwt.verifyToken], controller.findOne);
  app.delete("/api/shop/user/:id", [authJwt.verifyToken], controller.delete);
  app.put("/api/shop/user/:id", [authJwt.verifyToken],upload.single('profilePic'),controller.update )
 
  app.get(
    "/api/shop/admin",
    [authJwt.verifyToken, authJwt.isAdmin],
    controller.adminCont
  );

  app.post(
    "/api/shop/user/feedBack",
    [authJwt.verifyToken],
    fd.create
  );


  app.get(
    "/api/shop/admin/feedBack",
    [authJwt.verifyToken, authJwt.isAdmin],
    fd.findAll
  );


  app.delete(
    "/api/shop/admin/feedBack/:id",
    [authJwt.verifyToken, authJwt.isAdmin],
    fd.delete
  );


  app.delete(
    "/api/shop/admin/feedBack",
    [authJwt.verifyToken, authJwt.isAdmin],
    fd.deleteAll
  );
};
