import React, { useEffect, useState } from 'react';

import classes from './Slider.module.css';
import Aux from '../../hoc/auxiliary';

const Slider = (props) => {
  const [imageIndex, setImageIndex] = useState(0);
  const Image0 =
    'https://3.imimg.com/data3/KG/SP/MY-1502313/web-banner-advertise-500x500.jpg';
  const Image1 =
    'http://www.keywordroom.com/wp-content/uploads/2015/02/BANNER_portadas_facebook.png';
  const Image2 =
    'https://previews.123rf.com/images/efosstudio/efosstudio1912/efosstudio191200003/135689469-digital-marketing-concept-people-advertise-products-on-social-media-share-promotional-video-content-.jpg';

  const images = [Image0, Image1, Image2];

  const sliderHandler = (event) => {
    if (event.target.innerText === 'Left Arrow') {
      if (imageIndex === 0) {
        setImageIndex(2);
      } else {
        setImageIndex((currentState) => {
          return currentState - 1;
        });
      }
    } else {
      if (imageIndex === 2) {
        setImageIndex(0);
      } else {
        setImageIndex((currentState) => {
          return currentState + 1;
        });
      }
    }
  };

  useEffect(() => {
    const timer = setInterval(() => {
      if (imageIndex === 2) {
        setImageIndex((currentState) => 0);
      } else {
        setImageIndex((currentState) => currentState + 1);
      }
    }, 5000);

    return () => {
      clearInterval(timer);
    };
  }, [imageIndex]);

  return (
    <Aux classes={classes.Slider}>
      <span
        className={classes.LeftArrow}
        onClick={(event) => sliderHandler(event)}
      >
        <i className="fas fa-angle-left"></i>
      </span>
      <img
        src={images[imageIndex]}
        alt="product"
        className={classes.SliderImage}
      />
      <span
        className={classes.RightArrow}
        onClick={(event) => sliderHandler(event)}
      >
        <i className="fas fa-angle-right"></i>
      </span>
    </Aux>
  );
};

export default Slider;
