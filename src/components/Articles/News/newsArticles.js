import React from 'react';
import axios from 'axios';
import { URL } from '../../../config';
import styles from './newsArticles';

class NewsArticles extends React.Component {

	constructor(props) {
		super(props);
		this.state={
			id: this.props.match.params.id,
			article: {}
		}
	}

	UNSAFE_componentWillMount(){
		console.log(this.state.id);
		axios.get(`${URL}/articles?id=${this.state.id}`)
		.then( response => {
			this.setState({
				article: response.data[0]
			})
			// console.log('Article',this.state.article);
			// console.log('Article',JSON.stringify(response.data[0]));
		})
	}

	renderNewsArticle = (article) => {
		let template = article;
		if(article){
			console.log('Found article',article);
			return (
				<div style={{
					"textAlign":"center"
				}}>
					Author:- <b>{article.author}</b>
					<hr style={{
						"border":"2px solid black"
					}}/>	
					<div>
						Date:- {article.date}
					</div>
					<hr style={{
						"border":"2px solid black"
					}}/>
					<div style={{
                            "background":`url(../images/articles/${article.image})`,
                            "height": "300px",
                            "widht":"300px",
                            "margin":"10px"
                    }}></div>
                    <div>
                    	{article.body}
                    </div>
				</div>
			)
		}else{
			return null
		}
	}

	render() {
		console.log(this.state.article);
		return (
			<div>
				{this.renderNewsArticle(this.state.article)}
			</div>
		);
	}
}

export default NewsArticles;