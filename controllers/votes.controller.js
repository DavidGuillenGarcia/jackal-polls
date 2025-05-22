const Vote = require("../models/votes");

const sendVote = async (req, res) => {
  const voteInput = req.body;
  if (voteInput) {
    const checkVote = await Vote.find({
      user_id: voteInput.user_id,
      poll_id: voteInput.poll_id,
    });
    console.log(checkVote);
    if (checkVote == null) {
      const newVote = new Vote(voteInput);
      await newVote.save();
      res
        .status(201)
        .send(`You successfully voted on the poll ${newVote.poll_id}`);
    } else {
      res.status(500).send(`Error: You already voted on this poll.`);
    }
  } else {
    res.status(500).send("Error: Some of the required data is missing.");
  }
};

const checkPollById = async (req, res) => {};

module.exports = { sendVote, checkPollById };
