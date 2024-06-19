const mongoose = require("mongoose");

const characterSchema = new mongoose.Schema({
  character_name: { type: String, required: true },
  character_description: { type: String },
  character_image: { type: Object },
  comics: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Comic",
    },
  ],
});

const Character = mongoose.model("Character", characterSchema);

module.exports = Character;
