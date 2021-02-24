import React from 'react';
import {Route, Switch} from 'react-router-dom';

import Navbar from './Components/Navbar/Navbar';
import Navbar2nd from './Components/2ndNavbar/2ndNavbar';
import Slider from './Components/Slider/Slider';
import BigCard from './Components/BigCart/BigCart';

const App = props => {
  return (
    <div>
      <Navbar />
      <Navbar2nd />
      <Slider />
      <BigCard />
    </div>
  );
};

export default App;