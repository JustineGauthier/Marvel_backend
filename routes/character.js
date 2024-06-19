const express = require("express");
const axios = require("axios");
const router = express.Router();
const Character = require("../models/Character");

router.get("/", async (req, res) => {
  try {
    const { name, page } = req.query;
    let apiUrl = `https://lereacteur-marvel-api.herokuapp.com/characters?apiKey=${process.env.MARVEL_API_KEY}`;
    const response = await axios.get(apiUrl);
    let characters = response.data.results;

    if (name) {
      const regex = new RegExp(name, "i");
      characters = characters.filter((character) => regex.test(character.name));
    }

    const limit = 5;
    const pageNumber = page || 1;
    const numberToSkip = (pageNumber - 1) * limit;
    const paginatedCharacters = characters.slice(
      numberToSkip,
      numberToSkip + limit
    );

    res.status(200).json(paginatedCharacters);
  } catch (error) {
    console.log("error", error);
    res.status(500).json({ message: error.message });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const character_id = req.params.id;

    let apiUrl = `https://lereacteur-marvel-api.herokuapp.com/character/${character_id}?apiKey=${process.env.MARVEL_API_KEY}`;
    const response = await axios.get(apiUrl);
    let character = response.data;

    if (!character) {
      return res.status(404).json({ message: "Ce personnage n'existe pas" });
    }

    res.status(200).json(character);
  } catch (error) {
    console.log("error", error);
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
