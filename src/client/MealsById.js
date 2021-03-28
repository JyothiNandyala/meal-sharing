import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

function MealsById() {
  const params = useParams();
  const [meal, setMeal] = useState({});
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phonenumber, setPhoneNumber] = useState("");
  const [numberofguests, setNumberOfGuests] = useState("");
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");
  const [formerror, setFormError] = useState("");
  const [availablereservations, setAvailablereservations] = useState([]);

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

  //post request using fetch
  async function postDataForReservations(url = "", data = {}) {
    try {
      const response = await fetch(url, {
        method: "POST",
        mode: "cors",
        cache: "no-cache",
        credentials: "same-origin",
        headers: {
          "Content-Type": "application/json",
        },
        redirect: "follow",
        referrerPolicy: "no-referrer",
        body: JSON.stringify(data),
      });

      if (response.ok) {
        const message = `${data.contact_name} has been reserved ${data.number_of_guests} slots`;
        setSuccess(message);
      }
      return response.json();
    } catch (error) {
      setError(error);
    }
  }

  const addReservation = (event) => {
    event.preventDefault();
    const reservationValues = {
      number_of_guests: numberofguests,
      meal_id: params.id,
      contact_phonenumber: phonenumber,
      contact_name: name,
      contact_email: email,
    };
    if (
      name !== "" &&
      email !== "" &&
      phonenumber !== "" &&
      numberofguests !== ""
    ) {
      postDataForReservations("/api/reservations", reservationValues).then(
        (data) => {
          console.log(data); // JSON data parsed by `data.json()` call
        }
      );
      setName("");
      setEmail("");
      setPhoneNumber("");
      setNumberOfGuests("");
    } else {
      setFormError("Please fill the form before clicking the reserve button");
    }
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
              onChange={(event) => {
                const value = event.target.value;
                setName(value);
              }}
            />
            <br />
            <label htmlFor="email">Email Address*</label>
            <br />
            <input
              type="text"
              name="email"
              onChange={(event) => {
                const value = event.target.value;
                setEmail(value);
              }}
            />
            <br />
            <label htmlFor="phonenumber">Phone Number*</label>
            <br />
            <input
              type="number"
              name="phonenumber"
              onChange={(event) => {
                const value = event.target.value;
                setPhoneNumber(value);
              }}
            />
            <br />
            <label htmlFor="guests">Number Of Guests*</label>
            <br />
            <input
              type="number"
              name="numberofguests"
              min="0"
              max={specificMeal.map((meal) => {
                return meal.available_space
                  ? meal.available_space
                  : meal.max_reservations;
              })}
              onChange={(event) => {
                const value = event.target.value;
                setNumberOfGuests(Number(value));
              }}
            />
            <br />
            <button type="submit">Reserve</button>
            {success && <h3>{success}</h3>}
            {error && <h3>{error}</h3>}
          </form>
        ) : (
          <h2>Sorry we dont have the available reservations..</h2>
        )}
        {formerror && alert(formerror)}
      </div>
    </>
  );
}
export default MealsById;
