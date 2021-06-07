import React, { useEffect, useState } from "react";

const About = () => {
  return (
    <div className="about">
      <div className="about-heading">
        <h1>We Love Homemade Cooking</h1>
        <h4>
          Everyone Knows the Benefits of Meal-Sharing. Here’s How to Actually Do
          It
        </h4>
      </div>
      <div className="about-image">
        <img
          src="https://www.thespruceeats.com/thmb/p8ZMNKDBhXRQL6ISSwLzDnFeZCs=/3795x2423/filters:fill(auto,1)/Tapas-dinner-GettyImages-146629348-58d3ed653df78c5162873089.jpg"
          width="100%"
          height="450px"
        />
      </div>
      <div className="about-content">
        <p>
          Meal Sharing enables travelers and locals to connect with each other
          over home-cooked meals. The online application builds community,
          promotes cultural exchange, and encourages people to live healthier
          lives through the delicious world of food.
        </p>
        <p>
          Meal-sharing apps like Feastly, EatWith, and Cookapp, are basically
          like Airbnb for meals. They connect tourists with locals and are
          changing the way people travel.
        </p>
        <p>
          I decided to be a tourist within my own city and try out one of these
          apps. I signed myself up for Feastly, and booked a $42 dinner of
          unique handmade pizzas prepared by a woman named Michelle, who lives
          in Union Square, in the center of Manhattan. The three other guests I
          shared the meal with were all tourists visiting New York City from
          other countries.
        </p>
      </div>
    </div>
  );
};

export default About;
