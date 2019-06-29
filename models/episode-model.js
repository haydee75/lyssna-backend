const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const episodeSchema = new Schema(
  {
    id: String,
    reviews: [
      {
        id: String,
        user: { type: Schema.Types.ObjectId, ref: "User" },
        rating: Number,
        comments: String,
        title: String,
        image: String
      }
    ]
  },
  {
    timestamps: {
      createdAt: "createdAt",
      updatedAt: "updatedAt"
    }
  }
);

const Episode = mongoose.model("Episode", episodeSchema);

module.exports = Episode;
