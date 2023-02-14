import React from 'react';
import { AiFillInstagram, AiFillTwitterCircle } from 'react-icons/ai';

const Footer = () => {
  return (
    <div className='footer-container'>
      <p>2023 Tuigun's Headphones (c)</p>
      <p className='icons'>
        <AiFillInstagram/>
        <AiFillTwitterCircle/>
      </p>
    </div>
  )
}

export default Footer;
