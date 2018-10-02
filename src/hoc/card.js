import React from 'react';

const Card = (props) => {
	
	const style = {
		background: 'lightgrey',
		color: 'green'

	}

	return(
			<div style={style}>
				{console.log('Card',props.children)}{props.children}
			</div>
		)
}

export default Card;