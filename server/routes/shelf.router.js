const express = require("express");
const pool = require("../modules/pool");
const router = express.Router();

//const { rejectUnauthenticated } = require('../modules/authentication-middleware');

/**
 * Get all of the items on the shelf
 */
router.get("/", (req, res) => {
  console.log("getting items");
  const queryText = `SELECT * FROM item`;
  pool
    .query(queryText)
    .then((result) => {
      res.send(result.rows);
    })
    .catch((error) => {
      console.log("Error making SELECT from items", error);
      res.sendStatus(500);
    });
});

/**
 * Add an item for the logged in user to the shelf
 */
router.post("/", (req, res) => {
  console.log("Adding item to the stack");

  const image = req.body.image_url;
  const description = req.body.description;
  const queryText = `
    INSERT INTO item (image_url, description)
    VALUES ($1, $2)`;
  pool
    .query(queryText, [image, description])
    .then(() => res.sendStatus(201))
    .catch(() => res.sendStatus(500));
});

/**
 * Delete an item if it's something the logged in user added
 */
router.delete("/:id", (req, res) => {});

/**
 * Update an item if it's something the logged in user added
 */
router.put("/:id", (req, res) => {});

/**
 * Return all users along with the total number of items
 * they have added to the shelf
 */
router.get("/count", (req, res) => {});

/**
 * Return a specific item by id
 */
router.get("/:id", (req, res) => {});

module.exports = router;
