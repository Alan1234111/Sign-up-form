require("dotenv").config();
var express = require("express");
var router = express.Router();
const Message = require("../models/message");
const User = require("../models/user");

/* GET home page. */
router.get("/", async (req, res, next) => {
  const allMessages = await Message.find().sort({createdAt: -1}).exec();
  console.log(req.user);

  res.render("index", {
    message_list: allMessages,
    user: req.user,
  });
});

router.post("/add-message", async (req, res, next) => {
  try {
    const message = new Message({message: req.body.message, author: req.user.username});
    const result = await message.save();
    res.redirect("/");
  } catch (err) {
    console.log(err);
  }
});

router.post("/add-membership-status", async (req, res, next) => {
  try {
    if (req.body.passcode === process.env.PASSCODE) {
      const updatedUser = await User.findByIdAndUpdate(req.user._id, {membership: true}, {new: true});
    }
    res.redirect("/");
  } catch (err) {
    console.error(err);
    res.status(500).json({error: "Failed to add membership status"});
  }
});

router.post("/delete-message", async (req, res, next) => {
  try {
    await Message.findByIdAndDelete(req.body.delete);
    res.redirect("/");
  } catch (err) {
    console.error(err);
    res.status(500).json({error: "Failed to delete message"});
  }
});

module.exports = router;
