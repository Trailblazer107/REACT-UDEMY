import React from 'react';
import { Route, Switch } from 'react-router-dom';

//COMPONENTS
import Home from './components/Home/home';
import NewsArticles from './components/Articles/News/newsArticles';
import Layout from './hoc/layout/layout';
import SignIn from './components/SignIn/signIn';

const Routes = (props) => {
  return (
  	<Layout>
		<Switch>
			<Route path="/articles/:id" exact component={NewsArticles}/>
			<Route path="/" exact component={Home}/>
			<Route path="/sign-in" exact component={SignIn}/>
		</Switch>
  	</Layout>
  )
}

export default Routes;