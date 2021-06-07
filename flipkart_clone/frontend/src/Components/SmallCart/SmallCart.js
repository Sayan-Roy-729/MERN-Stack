import React from 'react';

import classes from './SmallCart.module.css';
import Aux from '../../hoc/auxiliary';

const SmallCart = (props) => {
  let differenceValue = 1500;
  let pointPercentage = differenceValue / (props.price + 1500);
  let percentageValue = (pointPercentage * 100).toFixed(2);

  return (
    <Aux classes={classes.SmallCart}>
      <div className={classes.CartBody}>
        <img src={props.imageSrc} alt="product" className={classes.CartImage} />
        <h3 className={classes.ProductTitle}>{props.productTitle}</h3>
        <h5>
          <span className={classes.ProductRating}>
            {props.rating}
            <i className="fas fa-star"></i>
          </span>{' '}
          <span className={classes.ratingCounts}>({props.ratingCounts})</span>
        </h5>
        <h3 className={classes.ProductPrice}>
          <i className="fas fa-rupee-sign"></i> {props.price}{' '}
          <span className={classes.ActualPrice}>
            <strike>(<i className="fas fa-rupee-sign"></i>{props.price + 1500})</strike>
          </span>
          <span className = {classes.Percentage}>%{percentageValue} off</span>
        </h3>
      </div>
    </Aux>
  );
};

export default SmallCart;
