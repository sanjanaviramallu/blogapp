import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLinkedin, faGithub, faInstagram } from "@fortawesome/free-brands-svg-icons";
import "./footer.css";

function Footer() {
  return (
    <footer className="section bg-footer">
      <div className="text-center mt-0">
        <p className="footer-alt mb-0 f-14">
          {/* LinkedIn */}
          <a href="https://www.linkedin.com/in/saketh-yamsani-5a89ba257" target="_blank" rel="noopener noreferrer">
            <FontAwesomeIcon icon={faLinkedin} size="2x"/>
          </a>{" "}
          |{" "}
          {/* GitHub */}
          <a href="https://github.com/Saketh-Yamsani" target="_blank" rel="noopener noreferrer">
            <FontAwesomeIcon icon={faGithub} size="2x"/>
          </a>{" "}
          |{" "}
          {/* Instagram */}
          <a href="https://www.instagram.com/saketh_yamsani" target="_blank" rel="noopener noreferrer">
            <FontAwesomeIcon icon={faInstagram} size="2x"/>
          </a>
        </p>
        <p className="footer-alt mb-0 f-14">Copyright © Saketh Yamsani, All Rights Reserved</p>
      </div>
    </footer>
  );
}

export default Footer;
