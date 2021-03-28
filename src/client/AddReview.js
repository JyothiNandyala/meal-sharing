import React, { useState } from "react";
import { useParams } from "react-router-dom";

function AddReview() {
  const params = useParams();
  const [reviewTitle, setReviewTitle] = useState("");
  const [reviewdescription, setReviewDescription] = useState("");
  const [reviewrating, setReviewRating] = useState("");
  const [message, setMessage] = useState("");
  //post request using fetch
  async function postDataForReviews(url = "", data = {}) {
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
        body: JSON.stringify(data), // body data type must match "Content-Type" header
      });
      if (response.ok) {
        setMessage("Thanks for Your comments..");
      }
      return response.json();
    } catch (error) {
      console.log(error);
    }
  }

  //adding the review
  const addReview = (event) => {
    event.preventDefault();
    const reviewValues = {
      title: reviewTitle,
      description: reviewdescription,
      meal_id: params.id,
      stars: reviewrating,
    };
    postDataForReviews("/api/reviews", reviewValues).then((data) => {
      console.log(data); // JSON data parsed by `data.json()` call
    });
    setReviewTitle("");
    setReviewDescription("");
    setReviewRating("");
  };

  return (
    <div className="review-form">
      <form onSubmit={addReview}>
        <h2>Please give the review for the meal...</h2>
        <p>
          " We always try our best not to forget to write review, especially
          when we are satisfied from the service and food in a small family
          owned restaurant, but sometimes can be a pressure."
        </p>
        <p>
          So, we decided to make this list with good restaurant review examples
          that you can copy and paste to help you speed up the process and help
          their business.
        </p>
        <div>
          <label htmlFor="reviewtitle">Title*</label>
          <input
            type="text"
            value={reviewTitle}
            className="title-input"
            required
            onChange={(event) => {
              const value = event.target.value;
              setReviewTitle(value);
            }}
          />
        </div>
        <div>
          <label htmlFor="reviewdescription">Description*</label>
          <input
            type="text"
            value={reviewdescription}
            className="description-input"
            required
            onChange={(event) => {
              const value = event.target.value;
              setReviewDescription(value);
            }}
          />
        </div>
        <div>
          <label htmlFor="ratings" className="rating-label">
            Ratings*
          </label>
          <select
            value={reviewrating}
            className="rating-input"
            onChange={(event) => {
              const value = event.target.value;
              setReviewRating(value);
            }}
          >
            <option>Select a rating</option>
            <option value="1">1</option>
            <option value="1">2</option>
            <option value="1">3</option>
            <option value="1">4</option>
            <option value="1">5</option>
          </select>
        </div>
        <button type="submit">AddReview</button>
      </form>
      {message && <h3>{message}</h3>}
    </div>
  );
}
export default AddReview;
