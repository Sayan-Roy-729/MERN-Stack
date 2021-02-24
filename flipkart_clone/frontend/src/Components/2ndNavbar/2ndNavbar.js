import React, { Component } from 'react';

import classes from './Navbar.module.css';
import Aux from '../../hoc/auxiliary';

// import images
import TopOffers from '../../assets/categories/Top Offers.png';
import Grocery from '../../assets/categories/Grocery.png';
import Mobiles from '../../assets/categories/Mobiles.png';
import Fashion from '../../assets/categories/Fashion.png';
import Electronics from '../../assets/categories/Electronics.png';
import Home from '../../assets/categories/Home.png';
import Applicances from '../../assets/categories/Applicances.png'
import Travel from '../../assets/categories/Travel.png';
import Beauty from '../../assets/categories/Beauty, Toys & More.png';

class Navbar2nd extends  Component {
  state = {
    lists: [
      {name: 'Top Offers', image: TopOffers},
      {name: 'Grocery', image: Grocery},
      {name: 'Mobiles', image: Mobiles},
      {name: 'Fashion', image: Fashion},
      {name: 'Electronics', image: Electronics},
      {name: 'Home', image: Home},
      {name: 'Applicances', image: Applicances},
      {name: 'Travel', image: Travel},
      {name: 'Beauty & Toys', image: Beauty}
    ]
  }

  render() {
    return(
      <Aux classes = {classes.Categories}>
        {this.state.lists.map((list, index) => {
          return (
            <div key = {index} className = {classes.Category}>
              <img src = {list.image} alt={list.name}/>
              <p>{list.name}</p>
            </div>
          );
        })}
      </Aux>

      // <h1 className = {classes.borderStyle}>Hello World</h1>
    );
  }
}

export default Navbar2nd;
