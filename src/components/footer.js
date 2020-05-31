import React from 'react';
import '../css/footer.css';
import logo from '../images/logo.png';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="logo">
        <img src={logo} alt="logo" />
      </div>
      <h3>&copy; Copyright 2020</h3>
      <h3>Made by Audrey Felicio Anwar & Fidella Widjojo</h3>
    </footer>
  );
};

export default Footer;
