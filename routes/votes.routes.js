const express = require("express");
const router = express.Router();
const { sendVote, checkPollById } = require("../controllers/votes.controller");

router.post("/", sendVote);
// router.get("/:_id", checkPoll);

module.exports = router;
