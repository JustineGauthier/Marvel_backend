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

    const limit = 8;
    const pageNumber = parseInt(page) || 1;
    const numberToSkip = (pageNumber - 1) * limit;
    const paginatedData = characters.slice(numberToSkip, numberToSkip + limit);
    const totalPages = Math.ceil(characters.length / limit);

    res.status(200).json({ paginatedData, limit, pageNumber, totalPages });
  } catch (error) {
    console.log("error", error);
    res.status(500).json({ message: error.message });
  }
});

// router.get("/:id", async (req, res) => {
//   try {
//     const character_id = req.params.id;

//     let apiUrl = `https://lereacteur-marvel-api.herokuapp.com/character/${character_id}?apiKey=${process.env.MARVEL_API_KEY}`;
//     const response = await axios.get(apiUrl);
//     let character = response.data;

//     if (!character) {
//       return res.status(404).json({ message: "Ce personnage n'existe pas" });
//     }
//     // console.log("character1", character);

//     const comicsPromises = character.comics.map(async (comic) => {
//       const comicResponse = await axios.get(
//         `https://lereacteur-marvel-api.herokuapp.com/comic/${comic}?apiKey=${process.env.MARVEL_API_KEY}`
//       );
//       return {
//         _id: comicResponse.data._id,
//         title: comicResponse.data.title,
//         thumbnail: comicResponse.data.thumbnail,
//       };
//     });

//     const comicsDetails = await Promise.all(comicsPromises);
//     character.comics = comicsDetails;

//     // console.log("character2", character);

//     res.status(200).json(character);
//   } catch (error) {
//     console.log("error", error);
//     res.status(500).json({ message: error.message });
//   }
// });

module.exports = router;
