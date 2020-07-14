const express = require("express");
const pool = require("../modules/pool");
const router = express.Router();
//const userStrategy = require("../strategies/user.strategy");

const {
  rejectUnauthenticated,
} = require("../modules/authentication-middleware");

/**
 * Get all of the items on the shelf
 */
router.get("/", (req, res) => {
  console.log("getting items");
  const queryText = `SELECT * FROM category`;
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

router.get("/videos", (req, res) => {
  console.log("getting videos");
  const queryText = `SELECT * FROM videos`;
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

router.get("/videoss", (req, res) => {
  // captures all videos associated with the category from database
  const queryText = `SELECT category.name, array_agg(url) as videos FROM "videos"
JOIN "category" ON videos.category_id = category.id
GROUP BY category.name;`;
  pool
    .query(queryText)
    .then((result) => {
      res.send(result.rows);
      console.log(result.rows);
    })
    .catch((error) => {
      console.log(`Error on query ${error}`);
      res.sendStatus(500);
    });
});

/**
 * Add an item for the logged in user to the shelf
 */
router.post("/", rejectUnauthenticated, (req, res) => {
  console.log("Adding item to the stack");

  const url = req.body.url;
  const category_id = req.body.category_id;
  // const user = req.user.id;
  const queryText = `
    INSERT INTO videos (url, category_id)
    VALUES ($1, $2 )`;
  pool
    .query(queryText, [url, category_id])
    .then(() => res.sendStatus(201))
    .catch(() => res.sendStatus(500));
});

/**
 * Delete an item if it's the admin account
 */
router.delete("/:id", rejectUnauthenticated, (req, res) => {
  let id = req.params.id;
  console.log(`ID from params: ${id}`);

  let queryText = `
    DELETE FROM videos WHERE id = $1`;
  pool
    .query(queryText, [id])
    .then(() => res.sendStatus(203))
    .catch((error) => res.send(error));
});

/**
 * Update an item if it's something the logged in user added
 */
router.put("/:id", rejectUnauthenticated, (req, res) => {
  let url = req.body.url;
  let category_id = req.body.category_id;
  let id = req.params.id;
  const queryText = `
    UPDATE videos SET url = $1, category_id = $2 WHERE id = $3`;
  pool
    .query(queryText, [url, category_id, id ])
    .then((result) => res.sendStatus(204))
    .catch((error) => console.log(error));
});
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