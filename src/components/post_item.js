import React from 'react';

const PostItem = (props) => {
	// console.log('Post Item props',props);
	return (
			<div>
				{props.match.params.id} - {props.match.params.name}
			</div>	
		)
}

export default PostItem;