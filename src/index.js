import React from 'react';
import ReactDom from 'react-dom';
import { 
	BrowserRouter, 
	// MemoryRouter,
	// HashRouter,
	Route, 
	NavLink,
	Switch
} from 'react-router-dom';

//COMPONENTS
import HomeComponent from './components/home';
import PostsComponent from './components/posts';
import ProfileComponent from './components/profile';
import PostItem from './components/post_item';
import LifeCyle from './components/lifecycle';
import ConditionalRendering from './components/conditional';

const App = () => {
	return(
			<BrowserRouter>
				<div>
					<header>
						<NavLink to="/">Home</NavLink><br/>
						<NavLink 
								to="/post"
								activeStyle= {{color: 'red'}}>
							Posts</NavLink><br/>
						<NavLink 
								to='/profile'
								activeStyle= {{color: 'red'}}>
							Profile</NavLink><br/>
						<NavLink 
								to='/lifecyle'
								activeStyle= {{color: 'red'}}>
							React LifeCyle</NavLink><br/>
						<NavLink 
								to='/conditional_rendering'
								activeStyle= {{color: 'red'}}>
							Conditional_Rendering</NavLink><br/>		
						<hr/>
					</header>

					<Switch>
						<Route path="/post/:id/:name" component={PostItem}/>
						<Route path="/profile" component={ProfileComponent}/>
						<Route path="/lifecyle" component={LifeCyle}/>
						<Route path="/conditional_rendering" component={ConditionalRendering}/>
						<Route path="/post" component={PostsComponent}/>
						<Route path="/" exact component={HomeComponent}/>
						<Route render={ () => 
								<h3>
									Oops seems to be wrong page
								</h3>

						}/>							
					</Switch>

				</div>
			</BrowserRouter>
			
		)
}

ReactDom.render(
	<App/>,
	document.querySelector('#root')		
)