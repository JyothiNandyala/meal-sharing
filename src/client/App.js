import React, { useState, useEffect } from "react";
import { Route, Switch } from "react-router-dom";
import Navigation from "./Navigation";
import "./App.css";
import FooterRouter from "./Footer";
import Meals from "./Meals";
import MealsById from "./MealsById";
import About from "./About";
import Contact from "./Contact";
import AddReview from "./AddReview";

const API = `/api/meals`;

function Home() {
  return (
    <div>
      <div className="mealsharing">
        <h1>We Love Home Cooked Meals</h1>
        <p>
          Enjoy home-cooked meals with locals around the world. Love eating? Be
          a guest! Love cooking? Be a host! A community that loves food, travel,
          & people.
        </p>
      </div>
      <img
        src="https://cdn.wallpapersafari.com/29/95/msu3PY.jpg"
        width="100%"
        height="450px"
      />
    </div>
  );
}

function App() {
  const [meals, setMeals] = useState([]);

  useEffect(() => {
    fetch(API)
      .then((res) => res.json())
      .then((data) => {
        setMeals(data);
      });
  }, []);

  return (
    <>
      <Navigation />
      <Switch>
        <Route exact path="/">
          <Home />
        </Route>
        <Route exact path="/about">
          <About />
        </Route>
        <Route exact path="/meals">
          <Meals meals={meals} />
        </Route>
        <Route exact path="/meals/:id">
          <MealsById />
        </Route>
        <Route exact path="/addreview/:id">
          <AddReview />
        </Route>
        <Route exact path="/contact">
          <Contact />
        </Route>
      </Switch>
      <FooterRouter />
    </>
  );
}

export default App;
