import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import classes from './Navbar.module.css';

class Navbar extends Component {
  state = {
    searchInput: "",
    loginList: [
      {listItem: 'My Profile', icon: <i className="fas fa-user-circle"></i>},
      {listItem: 'SuperCoin Zone', icon: <i className="fas fa-coins"></i>},
      {listItem: 'FlipKart Plus Zone', icon: <i className="fas fa-plus-circle"></i>},
      {listItem: 'Orders', icon: <i className="fas fa-cart-arrow-down"></i>},
      {listItem: 'Wishlist', icon: <i className="fas fa-heart"></i>},
      {listItem: 'My Chats', icon: <i className="fas fa-envelope"></i>},
      {listItem: 'Coupons', icon: <i className="far fa-id-card"></i>},
      {listItem: 'Gift Cards', icon: <i className="fas fa-sign-out-alt"></i>},
      {listItem: 'Notification', icon: <i className="fas fa-bell"></i>},
      {listItem: 'Logout', icon: <i className="fas fa-sign-out-alt"></i>},
    ],
    moreList: [
      {listItem: 'Notification Preferences', icon: <i className="fas fa-user-circle"></i>},
      {listItem: 'Sell on Flipkart', icon: <i className="fas fa-briefcase"></i>},
      {listItem: '24X7 Customer Care', icon: <i className="fas fa-question-circle"></i>},
      {listItem: 'Advertise', icon: <i className="fas fa-chart-line"></i>},
      {listItem: 'Download App', icon: <i className="fas fa-download"></i>},
    ]
  }

  searchInputHandler = event => {
    const value = event.target.value;
    this.setState({searchInput: value});
  }

  formSubmitHandler = event => {
    event.preventDefault();
    console.log(event);
  }

  render() {

    return (
      <nav className = {classes.Navbar}>
        <Link to="/" className = {classes.Navbarbrand}>Flipkart</Link>

        <form className = {classes.Navbar_form} onSubmit = {(event) => this.formSubmitHandler(event)}>
          {/* Search input */}
          <input 
            type="text" 
            className = {classes.Navbar_Input} 
            onChange = {(event) => this.searchInputHandler(event)} 
            value = {this.state.searchInput} 
            placeholder = "Search for products, brands and more"/>

          {/* Submit button  */}
          <button type="submit" className = {classes.Navbar_Button} onClick = {event => this.formSubmitHandler(event)}>
            <i className={"fas fa-search " + classes.Navbar_Search}></i>
          </button>
        </form>

        <ul className = {classes.Navbar_ul}>

          {/* Login part  */}
          <li className = {classes.Navbar_login}>
            <Link 
              to="/" >
                Login&nbsp;
                <i className={"fas fa-angle-down " + classes.Navbar_more_icon}></i>
            </Link>

            <ul className = {classes.Navbar_hidden + ' ' + classes.Navbar_login_hidden}>
              {this.state.loginList.map((list, index) => {
                return <li key = {index}><Link to = "/">{list.icon} {list.listItem}</Link></li>;
              })}
            </ul>
          </li>

          {/* more  */}
          <li className = {classes.Navbar_more}>
            <Link 
              to="/" >
                More&nbsp;
                <i className={"fas fa-angle-down " + classes.Navbar_more_icon}></i>
            </Link>

            <ul className = {classes.Navbar_hidden + ' ' + classes.Navbar_more_hidden}>
              {this.state.moreList.map((list, index) => {
                return <li key = {index}><Link to = "/">{list.icon} {list.listItem}</Link></li>;
              })}
            </ul>
          </li>

          {/* cart  */}
          <li>
            <Link to="/">Cart</Link>
          </li>
        </ul>
      </nav>
    );
  }
};

export default Navbar;
