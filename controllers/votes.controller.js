const Poll = require("../models/polls");
const Vote = require("../models/votes");

const sendVote = async (req, res) => {
  const voteInput = req.body;
  if (voteInput) {
    const checkVote = await Vote.find({
      user_id: voteInput.user_id,
      poll_id: voteInput.poll_id,
    });
    if (checkVote.length == 0) {
      const checkStatus = await Poll.findById(voteInput.poll_id);
      if (checkStatus.status == "open") {
        const newVote = new Vote(voteInput);
        await newVote.save();
        res
          .status(201)
          .send(`You successfully voted on the poll ${newVote.poll_id}`);
      } else {
        res.status(500).send(`Error: This poll is already closed.`);
      }
    } else {
      res.status(500).send(`Error: You already voted on this poll.`);
    }
  } else {
    res.status(500).send("Error: Some of the required data is missing.");
  }
};

const checkPollResultById = async (req, res) => {
  const votePollInputId = req.params._id;
  if (votePollInputId) {
    const pollResultOption1 = await Vote.countDocuments({
      poll_id: votePollInputId,
      option_selected: "option_1",
    });
    const pollResultOption2 = await Vote.countDocuments({
      poll_id: votePollInputId,
      option_selected: "option_2",
    });
    const pollResultOption3 = await Vote.countDocuments({
      poll_id: votePollInputId,
      option_selected: "option_3",
    });
    const pollResultOption4 = await Vote.countDocuments({
      poll_id: votePollInputId,
      option_selected: "option_4",
    });
    const pollOptions = await Poll.findById(votePollInputId);
    const pollResults = {
      name: pollOptions.name,
    };
    console.log(pollOptions.options);
    if (pollOptions.options[0].option_1) {
      pollResults.option_1 = {
        name: pollOptions.options[0].option_1,
        votes: pollResultOption1,
      };
    }
    if (pollOptions.options[0].option_2) {
      pollResults.option_2 = {
        name: pollOptions.options[0].option_2,
        votes: pollResultOption2,
      };
    }
    if (pollOptions.options[0].option_3) {
      pollResults.option_3 = {
        name: pollOptions.options[0].option_3,
        votes: pollResultOption3,
      };
    }
    if (pollOptions.options[0].option_4) {
      pollResults.option_4 = {
        name: pollOptions.options[0].option_4,
        votes: pollResultOption4,
      };
    }

    res.status(200).send(pollResults);
  } else {
    res.status(404).send("Error: Poll not found.");
  }
};

module.exports = { sendVote, checkPollResultById };
