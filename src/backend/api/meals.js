const express = require("express");
const router = express.Router();
const knex = require("../database");
//	Returns all meals

router.get("/", async (request, response) => {
  const maxPrice = parseInt(request.query.maxPrice) || '1e500';
  const title = request.query.title || '';
  const limitValue = parseInt(request.query.limit) || 7777777

  const availableReservations = eval(request.query.availableReservations);
  let createdAfter = new Date(request.query.createdAfter);
  createdAfter = (createdAfter > 0) ?
    createdAfter.toISOString() :
    0;
  try {
    if (request.query.hasOwnProperty("availableReservations")) {
      if (availableReservations) {
        console.log(availableReservations)
        let mealsWithAvailableReservations = await knex("meals").
          select(['meals.title', 'meals.max_reservations',
            knex.raw('meals.max_reservations - sum(reservation.number_of_guests) as "available_space"')])
          .sum('reservation.number_of_guests as reserved ')
          .join('reservation', 'meals.id', '=', 'reservation.meal_id')
          .groupBy('reservation.meal_id')
          .having(knex.raw('meals.max_reservations > sum(reservation.number_of_guests)'));

      const reservationMealsWithId=knex("reservation").select("meal_id");
       const mealsWithNotReserved=await knex("meals")
          .select('title','max_reservations')
          .where('id','not in',reservationMealsWithId)
        return response.json(mealsWithNotReserved.concat(mealsWithAvailableReservations));
      }
      else {
        response.status(404).send('There is no available reservations')
      }
}
    const meals = await knex("meals")
      .where('title', 'like', `%${title}%`)
      .where('price', '<=', maxPrice)
      .limit(limitValue)
      .where('created_date', '>', createdAfter);
    response.json(meals);
 } catch (error) {
    throw error;
  }

  //}

});
//Adds a new meal
router.post("/", async (request, response) => {
  try {
    return await knex("meals").insert(request.query)
      .then(mealId => {
        knex("meals")
          .where({ id: mealId[0] })
          .then(selectedMeal => {
            response.status(201).json(selectedMeal[0])
          })
      });
    
  } catch (error) {
    throw error;
  }
});
//Returns meal by id
router.get("/:id", async (request, response) => {
  try {
    // knex syntax for selecting things. Look up the documentation for knex for further info
    const mealWithId = await knex("meals").where({ id: parseInt(request.params.id) });
    response.json(mealWithId);
  } catch (error) {
    throw error;
  }
});
//Updates the meal by id
router.put("/:id", async (request, response) => {
  try {
    // knex syntax for selecting things. Look up the documentation for knex for further info
    const updateTheMeal = await knex("meals").where({ id: request.params.id })
      .update({ title: 'Rasmalai Sweet' });
    response.json(updateTheMeal);
  } catch (error) {
    throw error;
  }
});
//Deletes the meal by id
router.delete("/:id", async (request, response) => {
  try {
    // knex syntax for selecting things. Look up the documentation for knex for further info
    const deletedMeal = await knex("meals").where({ id: request.params.id })
      .del();
    response.json(deletedMeal);
  } catch (error) {
    throw error;
  }
});

module.exports = router;
