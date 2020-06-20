import React from 'react';
import '../css/footer.css';
import { medium } from '../colors';

const Footer = () => {
  return (
    <footer className="footer" style={{ backgroundColor: medium }}>
      <p>&copy; Copyright 2020</p>
      <p>Made by Audrey Felicio Anwar & Fidella Widjojo</p>
    </footer>
  );
};

export default Footer;
