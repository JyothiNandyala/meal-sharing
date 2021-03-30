import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import postData from "./Postdata";

const initialValues = {
  name: "",
  email: "",
  phonenumber: "",
  numberofguests: "",
};
function MealsById() {
  const params = useParams();
  const [meal, setMeal] = useState({});
  const [inputs, setInputs] = useState(initialValues);
  const [availablereservations, setAvailablereservations] = useState([]);

  //onchange function

  const handleChange = (event) => {
    const value = event.target.value;
    setInputs({
      ...inputs,
      [event.target.name]: value,
    });
  };

  //fetching the meals by id
  useEffect(() => {
    fetch(`/api/meals/${params.id}`)
      .then((response) => response.json())
      .then((mealId) => {
        setMeal(mealId[0]);
      });
    //available reservations
    fetch(`http://localhost:5000/api/meals?availableReservations=true`)
      .then((res) => res.json())
      .then((data) => {
        setAvailablereservations(data);
      });
  }, []);

  //getting the available reservations for specific meal

  const specificMeal = availablereservations.filter(
    (element) => element.id === Number(params.id)
  );
  //adding the reservation
  const addReservation = (event) => {
    event.preventDefault();
    const reservationValues = {
      number_of_guests: inputs.numberofguests,
      meal_id: params.id,
      contact_phonenumber: inputs.phonenumber,
      contact_name: inputs.name,
      contact_email: inputs.email,
    };

    const response = postData("/api/reservations", reservationValues).then(
      (data) => {
        console.log(data); // JSON data parsed by `data.json()` call
      }
    );
    if (response) {
      alert(
        `${reservationValues.contact_name} has been reserved ${reservationValues.number_of_guests} slots`
      );
    } else {
      throw new Error(response.status);
    }
    setInputs(initialValues);
  };

  return (
    <>
      <div className="meal-with-form">
        <div className="about-meal">
          <h3>Meal Information</h3>
          <h4>Name Of The Meal:</h4>
          <p>{meal.title}</p>

          <h4>Description:</h4>
          <p>{meal.description}</p>
          <h4>Price Of The Meal</h4>
          <p>{meal.price} DKK</p>
          <h4>Maximum Reservations</h4>
          <p>{meal.max_reservations}</p>
          <h4>Location Of The Meal:</h4>
          <p>{meal.location}</p>
          <h4>Date & Time</h4>
          <p>
            {new Date(meal.when).toLocaleString("da-DK", {
              year: "numeric",
              month: "long",
              day: "numeric",
              hour: "numeric",
              minute: "2-digit",
            })}
          </p>
        </div>

        {specificMeal.length !== 0 ? (
          <form onSubmit={addReservation} className="form-fields">
            <h3>Please Fill The Reservation Form</h3>
            <h3>
              Available Reservations:
              <span>
                {specificMeal.map((meal) => {
                  return meal.available_space
                    ? meal.available_space
                    : meal.max_reservations;
                })}
              </span>
            </h3>
            <label htmlFor="name">Name*</label>
            <br />
            <input
              type="text"
              name="name"
              value={inputs.name}
              required
              onChange={handleChange}
            />
            <br />
            <label htmlFor="email">Email Address*</label>
            <br />
            <input
              type="text"
              name="email"
              value={inputs.email}
              required
              onChange={handleChange}
            />
            <br />
            <label htmlFor="phonenumber">Phone Number*</label>
            <br />
            <input
              type="number"
              name="phonenumber"
              value={inputs.phonenumber}
              required
              onChange={handleChange}
            />
            <br />
            <label htmlFor="guests">Number Of Guests*</label>
            <br />
            <input
              type="number"
              name="numberofguests"
              value={inputs.numberofguests}
              required
              min="0"
              max={specificMeal.map((meal) => {
                return meal.available_space
                  ? meal.available_space
                  : meal.max_reservations;
              })}
              onChange={handleChange}
            />
            <br />
            <button type="submit">Reserve</button>
          </form>
        ) : (
          <h2>Sorry we dont have the available reservations..</h2>
        )}
      </div>
    </>
  );
}
export default MealsById;
