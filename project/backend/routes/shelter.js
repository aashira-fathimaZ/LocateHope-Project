// routes/shelters.js

const express = require("express");
const router = express.Router();
const { getAllShelters } = require("../getShelters");

router.get("/", async (req, res) => {
  try {
    const shelters = await getAllShelters();
    res.json(shelters);
  } catch (err) {
    res.status(500).json({ error: "Unable to fetch shelters" });
  }
});

module.exports = router;
