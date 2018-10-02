import React from 'react';
import { Link } from 'react-router-dom';

const PostsComponent = () => {

	const ids = [
		{id:'1', name: "akash"},
		{id: '2', name: "Raj"},
		{id: '3', name: "Om"}
	]

	// const list = 

	// return(
	// 		<div>
	// 			{list}
	// 		</div>
	// 	)

	return ids.map( item => {return(
				<div key={item.id}>
					<Link to={`/post/${item.id}/${item.name}`}>{item.name}</Link>
				</div>
	
			)}) 
}

export default PostsComponent;