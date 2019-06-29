const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const bibliothequeSchema = new Schema(
  {
    user: { type: Schema.Types.ObjectId, ref: "User" },
    id: String,
    image: String,
    title_original: String,
    publisher_original: String,
    audio: String
  },
  {
    timestamps: true
  }
);

const Bibliotheque = mongoose.model("Bibliotheque", bibliothequeSchema);

module.exports = Bibliotheque;
