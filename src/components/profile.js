import React from 'react';
import { NavLink } from 'react-router-dom';

//hoc
import Card from '../hoc/card';
import Auth from '../hoc/auth';

const ProfileComponent = (props) => {

	 console.log('Props',props);

	return(
			<Auth>
				<Card>
					ProfileComponent<br/>
					<p>Hello</p>
					<NavLink 
						to={`${props.match.url}/posts`}
						style= {{color: 'green'}}>
						Take me to here:- /profile/posts/
					</NavLink>
					<p>Hello</p>

				</Card>
			</Auth>
		)
}

export default ProfileComponent;