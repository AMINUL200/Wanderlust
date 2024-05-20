const express = require("express");
const router = express.Router({ mergeParams: true });
const User = require("../models/user");
const wraoAsync = require("../utils/wraoAsync");
const passport = require("passport");
const { saveRedirectUrl } = require("../middleware");
const userController = require("../controllers/user");

router
  .route("/signup")
  .get(userController.renderSngnupFrom)
  .post(wraoAsync(userController.signup));

router
  .route("/login")
  .get( userController.renderLoginForm)
  .post(
    saveRedirectUrl,
    passport.authenticate("local", {
      failureRedirect: "/login",
      failureFlash: true,
    }),
    userController.login
  );


router.get("/logout", userController.logout);

module.exports = router;