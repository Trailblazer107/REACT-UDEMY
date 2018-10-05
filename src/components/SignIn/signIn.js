import React, { Component } from 'react';

class SignIn extends Component {

	constructor(props) {
		super(props);
	}


	renderSignInForm = () =>(
		<div  style={{
			"textAlign":"center",
			"paddingTop": "200px",
			"paddingBottom": "200px"
		}}>
			<h3><u>SignIn to NBA App</u></h3>
			<div>
				<div>
					email: <input type="text" name="email"/>
				</div>
				<div>
					passw: <input type="text" name="password"/>
				</div>
			</div>
			<input type="button" value="submit"/>
		</div>
	)

	render() {
		return (
			<div>
				{this.renderSignInForm()}
			</div>
		);
	}
}

export default SignIn;