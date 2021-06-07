import React from "react";
import { FaGithub, FaInstagram, FaLinkedin, FaFacebook } from "react-icons/fa";
function FooterRouter() {
  return (
    <div className="footer">
      <div className="footer-content">
        <h3>Feeling Hungry</h3>
        <p>
          See something you like? Have an idea for an amazing meal of your own,
          or even something chill and casual?
        </p>

        <ul className="socials">
          <li>
            <FaGithub />
          </li>
          <li>
            <FaInstagram />
          </li>
          <li>
            <FaLinkedin />
          </li>
          <li>
            <FaFacebook />
          </li>
        </ul>
      </div>
      <div className="footer-bottom">
        <p>copyright &copy;2021 MealSharing . designed by JyothiNandyala</p>
      </div>
    </div>
  );
}

export default FooterRouter;
