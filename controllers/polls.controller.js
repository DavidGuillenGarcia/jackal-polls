const Poll = require("../models/polls");

const createPoll = async (req, res) => {
  const pollInput = req.body;

  if (pollInput.name) {
    if (!pollInput.options) {
      pollInput.options = {
        option_1: "yes",
        option_2: "no",
      };

      const newPoll = new Poll(pollInput);
      await newPoll.save();
      res.status(201).send(`Poll created ${newPoll._id} sucessfully`);
      return;
    }
    if (pollInput.options.option_1 && !pollInput.options.option_2) {
      res
        .status(500)
        .send(
          `Error: At least 2 options are required, you can let all the options empty for a "yes" or "no" options.`
        );
      return;
    } else {
      const newPoll = new Poll(pollInput);
      await newPoll.save();
      res.status(201).send(`Poll ${newPoll._id} created sucessfully`);
      return;
    }
  } else {
    res.status(500).send("Error: Poll name is required");
  }
};

const getPollById = async (req, res) => {
  const pollInputId = req.params._id;
  const selectedPoll = await Poll.findById(pollInputId);
  if (selectedPoll) {
    res.status(200).send(selectedPoll);
  } else {
    res.status(404).send(`Error: Could not find the poll`);
  }
};

const getPolls = async (req, res) => {
  const pollStatusInput = req.query.status;
  if (!pollStatusInput) {
    const pollsFound = await Poll.find({});
    res.status(200).send(pollsFound);
  }
  if (pollStatusInput == "open") {
    const pollsFiltered = await Poll.find({ status: "open" });
    res.status(200).send(pollsFiltered);
  }
  if (pollStatusInput == "closed") {
    const pollsFiltered = await Poll.find({
      status: "closed",
    });
    res.status(200).send(pollsFiltered);
  } else {
    res.status(404).send("Error: No polls found.");
  }
};

const updatePollById = async (req, res) => {
  const pollInputId = req.params._id;
  if (pollInputId) {
    const pollInput = req.body;
    if (pollInput) {
      const updateFilter = {};

      if (pollInput.name) {
        updateFilter.name = pollInput.name;
      }
      if (pollInput.option_1) {
        updateFilter.option_1 = pollInput.option_1;
      }
      if (pollInput.option_2) {
        updateFilter.option_2 = pollInput.option_2;
      }
      if (pollInput.option_3) {
        updateFilter.option_3 = pollInput.option_3;
      }
      if (pollInput.option_4) {
        updateFilter.option_4 = pollInput.option_4;
      }
      if (pollInput.status) {
        updateFilter.status = pollInput.status;
      }
      await Poll.findByIdAndUpdate({ _id: pollInputId }, updateFilter);
      res.status(200).send(`Poll ${pollInputId} was updated successfully.`);
    } else {
      res
        .status(500)
        .send(
          "Error: No changes found, you need to do 1 change at least to update the poll."
        );
    }
  } else {
    res.status(404).send("Error: Poll not found.");
  }
};

const updatePollStatusById = async (req, res) => {
  const pollInputId = req.params._id;

  if (pollInputId) {
    const pollInputStatus = req.body.status;

    if (!pollInputStatus) {
      res
        .status(500)
        .send(
          "Error: A new status is required, you can use 'open' or 'closed'."
        );
    } else {
      const selectedPoll = await Poll.findById(pollInputId);

      if (!selectedPoll) {
        res.status(404).send("Error: Poll not found.");
      }
      if (pollInputStatus == "open" || pollInputStatus == "closed") {
        await Poll.findByIdAndUpdate(
          { _id: pollInputId },
          {
            status: pollInputStatus,
          }
        );
        res
          .status(201)
          .send(`Poll status updated successfully to ${pollInputStatus}`);
      } else {
        res
          .status(500)
          .send(
            `Error: ${pollInputStatus} is not a valid status, you can use 'open' or 'closed'`
          );
      }
    }
  } else {
    res.status(404).send("Error: Poll not found.");
  }
};

module.exports = {
  createPoll,
  updatePollById,
  updatePollStatusById,
  getPollById,
  getPolls,
};
