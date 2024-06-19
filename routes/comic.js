const express = require("express");
const axios = require("axios");
const router = express.Router();
const Comic = require("../models/Comic");

router.get("/", async (req, res) => {
  try {
    const { title, page, sort } = req.query;
    let apiUrl = `https://lereacteur-marvel-api.herokuapp.com/comics?apiKey=${process.env.MARVEL_API_KEY}`;
    const response = await axios.get(apiUrl);
    let comics = response.data.results;

    if (title) {
      const regex = new RegExp(title, "i");
      comics = comics.filter((comic) => regex.test(comic.title));
    }

    const limit = 5;
    const pageNumber = page || 1;
    const numberToSkip = (pageNumber - 1) * limit;
    const paginatedComics = comics.slice(numberToSkip, numberToSkip + limit);

    paginatedComics.sort();

    res.status(200).json(paginatedComics);
  } catch (error) {
    console.log("error", error);
    res.status(500).json({ message: error.message });
  }
});

router.get("/character/:characterId", async (req, res) => {
  try {
    const character_id = req.params.characterId;

    let apiUrl = `https://lereacteur-marvel-api.herokuapp.com/comics/${character_id}?apiKey=${process.env.MARVEL_API_KEY}`;
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

router.get("/:comicId", async (req, res) => {
  try {
    const comic_id = req.params.comicId;

    let apiUrl = `https://lereacteur-marvel-api.herokuapp.com/comic/${comic_id}?apiKey=${process.env.MARVEL_API_KEY}`;
    const response = await axios.get(apiUrl);
    let comic = response.data;

    if (!comic) {
      return res.status(404).json({ message: "Ce personnage n'existe pas" });
    }

    res.status(200).json(comic);
  } catch (error) {
    console.log("error", error);
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
