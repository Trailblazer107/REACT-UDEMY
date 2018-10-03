import React from 'react';
import UserTemplate from './user_template';

export default class User extends React.Component {
	
	state = {
		name: 'akash',
		age: 23,
		mother: "Bharti"

	}

	render() {
		return (
			<div>
				<UserTemplate {...this.state}></UserTemplate>		
			</div>
		);
	}
}
