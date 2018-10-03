import React from 'react';
import { Route, Switch } from 'react-router-dom';

//COMPONENTS
import Home from './components/Home/home';

const Routes = (props) => {
  return (
  	<Switch>
    	<Route path="/" component={Home}/>
  	</Switch>

  )
}

export default Routes;