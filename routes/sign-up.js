const express = require("express");
const router = express.Router();
const User = require("../models/user");
const {body, validationResult} = require("express-validator");
const bcrypt = require("bcrypt");

router.get("/", function (req, res, next) {
  if (!req.user) {
    res.render("sign-up");
  } else {
    res.redirect("/");
  }
});

router.post(
  "/",
  [
    body("username", "Username must contain at least 3 characters").trim().isLength({min: 3}).escape(),
    body("email")
      .isEmail()
      .withMessage("Please enter a valid email address")
      .custom(async (value) => {
        const user = await User.findUserByEmail(value);
        if (user) {
          throw new Error("E-mail already in use");
        }
      }),
    body("password", "Password must meet the requirements")
      .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*_=+-]).{8,16}$/)
      .withMessage("Password must contain at least one lowercase letter, one uppercase letter, one numeric value, one special symbol, and be 8-16 characters long")
      .trim()
      .escape(),
    body("confirm-password").custom((value, {req}) => {
      return value === req.body.password;
    }),
  ],
  async (req, res, next) => {
    try {
      const errors = validationResult(req);

      if (!errors.isEmpty()) {
        return res.render("sign-up", {
          errors: errors.array(),
        });
      }

      const saltRounds = 10;
      const hashedPassword = await bcrypt.hash(req.body.password, saltRounds);

      const user = new User({
        username: req.body.username,
        password: hashedPassword,
        email: req.body.email,
        membership: false,
      });

      const result = await user.save();
      res.redirect("/");
    } catch (err) {
      res.render("sign-up");
      return next(err);
    }
  }
);

module.exports = router;
