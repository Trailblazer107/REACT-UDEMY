import React from 'react';

const Auth = (props) => {

	const password = "pass123"

	return( password !== "pass123" 

				?
					<h2>Invalid password</h2>
				:
					<div>
						{props.children}
					</div>
		)
}

export default Auth;