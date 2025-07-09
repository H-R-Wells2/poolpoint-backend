import mongoose from "mongoose";

const resultSchema = new mongoose.Schema({
  players: [
    {
      playerName: {
        type: String,
        required: true,
      },
      score: {
        type: Number,
        required: true,
      },
      amount: {
        type: Number,
      },
      isTeamWon: {
        type: Boolean,
      },
    },
  ],
  date: {
    type: Date,
    default: Date.now,
  },
});

const Result = mongoose.models.Result || mongoose.model("Result", resultSchema);

export default Result;
