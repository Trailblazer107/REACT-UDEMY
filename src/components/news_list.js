import React from 'react';
import NewsListItemComponent from './news_list_item';

const NewsList = (props) => {
	const items = props.news.map( (item) => {
		return(
				<div>
					<NewsListItemComponent key={item.id} news_item= {item}/>
				</div>
			)
	})

	
		return(
				<div>
					{items}
				</div>
			)
}

export default NewsList;