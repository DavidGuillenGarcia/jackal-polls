const express = require("express");
const router = express.Router();
const {
  createPoll,
  getPolls,
  getPollById,
  updatePollById,
  updatePollStatusById,
} = require("../controllers/polls.controller");

router.post("/", createPoll);
router.get("/", getPolls);
router.get("/:_id", getPollById);
router.patch("/:_id", updatePollStatusById);
router.put("/:_id", updatePollById);

module.exports = router;
