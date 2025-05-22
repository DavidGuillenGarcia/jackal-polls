const express = require("express");
const router = express.Router();
const {
  sendVote,
  checkPollResultById,
} = require("../controllers/votes.controller");

router.post("/", sendVote);
router.get("/:_id", checkPollResultById);

module.exports = router;
