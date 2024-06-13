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
          <a href="https://www.linkedin.com/in/sanjana-viramallu/" target="_blank" rel="noopener noreferrer">
            <FontAwesomeIcon icon={faLinkedin} size="2x"/>
          </a>{" "}
          |{" "}
          {/* GitHub */}
          <a href="https://github.com/sanjanaviramallu" target="_blank" rel="noopener noreferrer">
            <FontAwesomeIcon icon={faGithub} size="2x"/>
          </a>{" "}
          |{" "}
          {/* Instagram */}
          <a href="https://www.instagram.com/_.sanjana_shetty?igsh=MXNkemt0NHg2d3VkMQ==" target="_blank" rel="noopener noreferrer">
            <FontAwesomeIcon icon={faInstagram} size="2x"/>
          </a>
        </p>
        <p className="footer-alt mb-0 f-14">Copyright © Sanjana Viramallu, All Rights Reserved</p>
      </div>
    </footer>
  );
}

export default Footer;
