const { authJwt } = require("../middlewares");
const controller = require("../controllers/user.controller");

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
  app.put("/api/shop/user/:id", [authJwt.verifyToken], controller.update);
  app.get(
    "/api/shop/admin",
    [authJwt.verifyToken, authJwt.isAdmin],
    controller.adminCont
  );
};
