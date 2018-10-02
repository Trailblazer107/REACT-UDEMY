import React from 'react';

const ConditionalRendering = () => {

	const checkBoolean = false;
		
	const showIt = () => {
		return(
				checkBoolean ?

				<div>
					Boolean is ture
				</div>

				:

				<div>
					Boolean is false
				</div>
			)
	}

	return(
			<div>
				{ showIt() }
			</div>
		)
}

export default ConditionalRendering;