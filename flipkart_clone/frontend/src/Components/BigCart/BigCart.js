import React, { useEffect, useRef, useState } from 'react';
import { connect } from 'react-redux';

import classes from './BigCart.module.css';
import SmallCart from '../SmallCart/SmallCart';
import Aux from '../../hoc/auxiliary';
import Button from '../Button/Button';

const BigCart = (props) => {
  // CountDown DOM Referance
  let countDownRef = useRef();
  const productContainer = useRef();
  const everyCartRef = useRef();
  const [scrollValue, setScrollValue] = useState(0);
  const [showLeftArrow, setShowLeftArrow] = useState(false);
  const [showRightArrow, setShowRightArrow] = useState(true);

  useEffect(() => {
    // Offer Expire Date
    const countDownDate = new Date('Feb 24, 2021 15:37:25').getTime();

    // Start Countdown
    const timer = setInterval(() => {
      // Get current time
      const currentTime = new Date().getTime();
      // Get left time
      const differenceTime = countDownDate - currentTime;

      // Calculate Days, hours, minutes & seconds
      const days = Math.floor(differenceTime / (1000 * 60 * 60 * 24));
      const hours = Math.floor(
        (differenceTime % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
      );
      const minutes = Math.floor(
        (differenceTime % (1000 * 60 * 60)) / (1000 * 60)
      );
      const seconds = Math.floor((differenceTime % (1000 * 60)) / 1000);

      // Show the countdown
      countDownRef.current.innerText = `${days} : ${hours} : ${minutes} : ${seconds} Left `;
    }, 1000);

    return () => {
      clearInterval(timer);
    };
  }, []);

  useEffect(() => {
    const cartWidth = everyCartRef.current.clientWidth * 12;
    console.log(cartWidth);
    // const element = (productContainer.current.style.width = cartWidth);

    productContainer.current.style.width = '3000px';
    // productContainer.current;

    console.log(productContainer);
  });

  return (
    <Aux classes={classes.BigCard}>
      <div className={classes.Header}>
        <div>
          <h3 className={classes.BigCartTitle}>Deals of the Day</h3>
          <span className={classes.BigCartClock}>
            <i className="fas fa-clock"></i>{' '}
            <span className={classes.Offer}>Offers Expired</span>
          </span>
          <span className={classes.SecondaryTitle} ref={countDownRef}></span>
        </div>
        <div>
          <Button
            style={{ backgroundColor: '#2874f0', fontSize: '16px' }}
            buttonName="View All"
          />
        </div>
      </div>

      <hr className={classes.Divider} />

      <div className={classes.ProductCarts} >

        {showLeftArrow ? (
          <div className={classes.LeftArrow}>
            <i className="fas fa-chevron-left"></i>
          </div>
        ) : null}

        {showRightArrow ? (
          <div className={classes.RightArrow}>
            <i className="fas fa-chevron-right"></i>
          </div>
        ) : null}

        <div ref={productContainer} className = {classes.displayProducts}>
          {props.products.map((product, index) => {
            return (
              <div className={classes.Product} ref={everyCartRef} key={index}>
                <SmallCart
                  key={index}
                  imageSrc={product.image}
                  productTitle={product.title}
                  rating={product.rating}
                  ratingCounts={product.ratingCount}
                  price={product.price}
                />
              </div>
            );
          })}
        </div>


      </div>
    </Aux>
  );
};

const mapStateToProps = (state) => {
  return {
    products: state.products,
  };
};

export default connect(mapStateToProps)(BigCart);
