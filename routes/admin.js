const express = require("express");
const router = express.Router();
const User = require("../models/user");

router.get("/", function (req, res, next) {
  if (!req.user) {
    res.redirect("/log-in");
  } else {
    res.render("admin");
  }
});

router.post("/", async (req, res, next) => {
  try {
    if (req.body.adminPasscode === process.env.ADMIN_PASSCODE) {
      const updatedUser = await User.findByIdAndUpdate(req.user._id, {admin: true}, {new: true});
    }
    res.redirect("/");
  } catch (err) {
    console.error(err);
    res.status(500).json({error: "Failed to add membership status"});
  }
});

module.exports = router;
