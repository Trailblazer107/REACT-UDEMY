import React from 'react';
import ReactDom from 'react-dom';
import { BrowserRouter, Route } from 'react-router-dom';

//COMPONENTS
import HomeComponent from './components/home';
import PostsComponent from './components/posts';
import ProfileComponent from './components/profile';


const App = () => {
	return(
			<BrowserRouter>
				<div>
					<header>
						HEADER
					</header>
					<Route path="/" exact component={HomeComponent}/>
					<Route path="/post"  component={PostsComponent}/>
					<Route path="/profile" component={ProfileComponent}/>
				</div>
			</BrowserRouter>
			
		)
}

ReactDom.render(
	<App/>,
	document.querySelector('#root')		
)