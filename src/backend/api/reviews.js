const express = require("express");
const router = express.Router();
const app = express();
const knex = require("../database");
//	Returns all reviews
router.get("/", async (request, response) => {
  try {
    const reviews=await knex("review");
    response.json(reviews);
  } catch (error) {
    throw error;
  }
});

//Adds a new review
router.post("/", async (request, response) => {
    try {
      
     const insertedReview= await knex("review").insert(request.body)
      response.json(insertedReview);
    } catch (error) {
      throw error;
    }
  });
//Returns review by id
router.get("/:id", async (request, response) => {
    try {
      // knex syntax for selecting things. Look up the documentation for knex for further info
      const reviewWithId = await knex("review").where({id:parseInt(request.params.id)});
      response.json(reviewWithId);
     } catch (error) {
      throw error;
    }
  });
  //Updates the review by id
router.put("/:id", async (request, response) => {
    try {
      // knex syntax for selecting things. Look up the documentation for knex for further info
      const updateTheReview = await knex("review").where({id:request.params.id})
      .update(request.body);
  response.json(updateTheReview);
     } catch (error) {
      throw error;
    }
  });
  //Deletes the review by id
  router.delete("/:id", async (request, response) => {
    try {
      // knex syntax for selecting things. Look up the documentation for knex for further info
      const deletedReview = await knex("review").where({id:request.params.id})
      .del();
  response.json(deletedReview);
     } catch (error) {
      throw error;
    }
  });
module.exports = router;