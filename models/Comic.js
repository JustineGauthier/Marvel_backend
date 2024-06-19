const mongoose = require("mongoose");

const comicSchema = new mongoose.Schema({
  comic_title: { type: String, required: true },
  comic_description: { type: String },
  comic_image: { type: Object },
  characters: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Character",
    },
  ],
});

const Comic = mongoose.model("Comic", comicSchema);

module.exports = Comic;
