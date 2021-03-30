import React, { useEffect, useState } from "react";
import "./App.css";
import "./index.css";
import { Link } from "react-router-dom";
import postData from "./Postdata";

const initialValues = {
  title: "",
  description: "",
  location: "",
  price: "",
  when: "",
  maxreservations: "",
  createddate: "",
};

function Meals() {
  const [inputs, setInputs] = useState(initialValues);
  const [meals, setMeals] = useState([]);
  const [reviews, setReviews] = useState([]);
  const [searchInput, setSearchInput] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  //handling the inputs
  const handleChange = (event) => {
    const value = event.target.value;
    setInputs({
      ...inputs,
      [event.target.name]: value,
    });
  };

  useEffect(() => {
    if (searchInput == "") {
      fetch(`/api/meals`)
        .then((res) => res.json())
        .then((mealsdata) => {
          setIsLoading(false);
          setMeals(mealsdata);
        });
    } else {
      fetch(`/api/meals?title=${searchInput}`)
        .then((res) => res.json())
        .then((mealsWithTitle) => {
          setIsLoading(false);
          setMeals(mealsWithTitle);
        });
    }

    fetch(`/api/reviews`)
      .then((response) => response.json())
      .then((reviewsData) => {
        setReviews(reviewsData);
      });
  }, [searchInput]);

  //calculating the numbers of stars and average of the stars for specific meal
  const reviewsWithMeals = (meal_id) => {
    const ratings = reviews
      .filter((review) => {
        return review.meal_id === meal_id;
      })
      .map((star) => star.stars);
    //calculating the total ratings
    const totalRatings = ratings.reduce(
      (accumulator, currentValue) => accumulator + currentValue,
      0
    );

    //average of the ratings
    const averageRatings = Math.ceil(totalRatings / ratings.length);
    return averageRatings;
  };

  const images = [
    "https://5.imimg.com/data5/BQ/LF/MY-24852937/rasmalai-sweet-500x500.jpg",
    "https://www.budgetbytes.com/wp-content/uploads/2016/04/Ultimate-Portobello-Mushroom-Pizza-sliced-1-500x480.jpg",
    "https://www.recipetineats.com/wp-content/uploads/2017/11/Chicken-Doner-Kebab-2.jpg",
    "https://ministryofcurry.com/wp-content/uploads/2020/04/spinach-dal-1-scaled.jpg",
    "https://www.vegrecipesofindia.com/wp-content/uploads/2015/04/kaju-masala-recipe-1.jpg",
    "https://cdn.igp.com/f_auto,q_auto,t_prodm/products/p-pineapple-cake-with-cherry-toppings-1-kg--16989-m.jpg",
  ];

  const randomPics = [
    "https://media1.s-nbcnews.com/i/newscms/2019_21/2870431/190524-classic-american-cheeseburger-ew-207p_d9270c5c545b30ea094084c7f2342eb4.jpg",
    "https://i2.wp.com/runningonrealfood.com/wp-content/uploads/2018/01/gluten-free-vegan-everyday-healthy-rainbow-salad-Running-on-Real-Food-6-of-10.jpg",
  ];

  let randomImages = randomPics[Math.floor(Math.random() * randomPics.length)];

  const addMeal = (event) => {
    event.preventDefault();

    const newMeal = {
      title: inputs.title,
      description: inputs.description,
      location: inputs.location,
      when: inputs.when,
      max_reservations: inputs.maxreservations,
      price: inputs.price,
      created_date: inputs.createddate,
    };

    const response = postData("/api/meals", newMeal).then((data) => {
      console.log(data); // JSON data parsed by `data.json()` call
    });
    if (response) {
      alert(`${newMeal.title} Meal has been added successfully!!`);
    } else {
      throw new Error(response.status);
    }
    setInputs(initialValues);
  };

  return (
    <div>
      {isLoading ? (
        <div style={{ textAlign: "center", fontSize: "20px" }}>Loading...</div>
      ) : (
        <>
          <div className="search-form">
            <h1>Welcome To Meals App</h1>
            <input
              type="text"
              placeholder="Search for item.."
              name="search"
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
            />
          </div>
          <div className="cards">
            {meals.length > 0 ? (
              meals.map((meal, index) => (
                <div className="main" key={meal.id}>
                  <div className="image">
                    <img src={images[index] ? images[index] : randomImages} />
                  </div>
                  <div className="title">
                    <h4>{meal.title}</h4>
                  </div>
                  <hr />
                  {reviewsWithMeals(meal.id) ? (
                    <div className="starRatingInput">
                      <span
                        className={
                          reviewsWithMeals(meal.id) >= 1 ? "highlighted" : ""
                        }
                      >
                        {" "}
                        ★
                      </span>
                      <span
                        className={
                          reviewsWithMeals(meal.id) >= 2 ? "highlighted" : ""
                        }
                      >
                        {" "}
                        ★
                      </span>
                      <span
                        className={
                          reviewsWithMeals(meal.id) >= 3 ? "highlighted" : ""
                        }
                      >
                        {" "}
                        ★
                      </span>
                      <span
                        className={
                          reviewsWithMeals(meal.id) >= 4 ? "highlighted" : ""
                        }
                      >
                        {" "}
                        ★
                      </span>
                      <span
                        className={
                          reviewsWithMeals(meal.id) >= 5 ? "highlighted" : ""
                        }
                      >
                        {" "}
                        ★
                      </span>
                    </div>
                  ) : (
                    <div>
                      <p style={{ textAlign: "center" }}>No reviews</p>
                    </div>
                  )}

                  <div className="description">
                    <p>{meal.description}</p>
                  </div>
                  <hr />
                  <div className="price">
                    <p>Price:{meal.price}DK</p>
                  </div>
                  <hr />
                  <div className="moreinfo">
                    <Link to={`/meals/${meal.id}`}>
                      <h3 className="moreinfo-link">MoreInfo</h3>
                    </Link>
                  </div>
                  <div className="review">
                    <Link to={`/addreview/${meal.id}`}>
                      <h3 className="review-link">Review</h3>
                    </Link>
                  </div>
                </div>
              ))
            ) : (
              <h2>No meals found...</h2>
            )}
          </div>
        </>
      )}

      <div className="add-meal">
        <form onSubmit={addMeal}>
          <h2>Add a Meal</h2>
          <p>Please add the meal is here</p>
          <div className="form-group">
            <label htmlFor="title" className="form-label">
              Title Of The Meal*
            </label>
            <input
              type="text"
              name="title"
              value={inputs.title}
              required
              className="form-input"
              onChange={handleChange}
            />
          </div>
          <br />
          <div className="form-group">
            <label htmlFor="description" className="form-label">
              Description Of The Meal*
            </label>
            <input
              type="text"
              name="description"
              value={inputs.description}
              required
              className="form-input"
              onChange={handleChange}
            />
          </div>
          <br />
          <div className="form-group">
            <label htmlFor="location" className="form-label">
              Location*
            </label>
            <input
              type="text"
              name="location"
              value={inputs.location}
              required
              className="form-input"
              onChange={handleChange}
            />
          </div>
          <br />
          <div className="form-group">
            <label htmlFor="when" className="form-label">
              Date & Time*
            </label>
            <input
              type="datetime-local"
              name="when"
              value={inputs.when}
              required
              className="form-input"
              onChange={handleChange}
            />
          </div>
          <br />
          <div className="form-group">
            <label htmlFor="maxreservations" className="form-label">
              Maximum Reservations*
            </label>
            <input
              type="number"
              name="maxreservations"
              value={inputs.maxreservations}
              required
              className="form-input"
              onChange={handleChange}
            />
          </div>
          <br />
          <div className="form-group">
            <label htmlFor="price" className="form-label">
              Price Of The Meal*
            </label>
            <input
              type="number"
              name="price"
              value={inputs.price}
              required
              className="form-input"
              onChange={handleChange}
            />
          </div>

          <br />

          <div className="form-group">
            <label htmlFor="createddate" className="form-label">
              Created Date*
            </label>
            <input
              type="date"
              name="createddate"
              value={inputs.createddate}
              required
              className="form-input"
              onChange={handleChange}
            />
          </div>
          <button type="submit">AddMeal</button>
        </form>
      </div>
    </div>
  );
}
export default Meals;
