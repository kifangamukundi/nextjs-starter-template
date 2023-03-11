'use client'
import React from 'react'
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

export const ImageCarousel = ({ images, description }) => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000 // set this value to control the speed of automatic sliding
  };
  return (
    <Slider {...settings}>
      {images.map(image => (
        <div key={image._id} className="relative">
          <img 
            src={image.secure_url} 
            alt={description}
            className="rounded-lg w-full h-auto object-cover"
          />
        </div>
      ))}
    </Slider>
  )
}
