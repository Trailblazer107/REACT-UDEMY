import React from 'react';

const userHoc = (UserComponent1, UserComponent2, UserComponent3, arg1) => {
	// console.log(props);
	// const var1 = props[0]
	return () => (
			<div>
				<UserComponent1/>				
				<UserComponent2/>				
				<UserComponent3/>				
				{arg1}

			</div>
		)
}

export default userHoc;