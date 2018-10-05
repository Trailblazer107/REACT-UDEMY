import React from 'react';
// import { CSSTransition, TransitionGroup } from 'react-transition-group';
import axios from 'axios';
import styles from './newsList.css';
import { Link } from 'react-router-dom';
import { URL } from '../../../config';


class NewsList extends React.Component {

	constructor(props){
		super(props);

		this.state=	{
			teams:[],
			items:[],
			end: 0
		}
	}
	
	getTeams(){
		console.log('Inside get teams');

		axios.get(`${URL}/teams`)
		.then(response => {
			this.setState({
				teams: response.data
			})
		})

	}

	get_name 
	UNSAFE_componentWillMount(){
		console.log('1');
		this.requests(this.props.start, this.props.amount);
		this.getTeams();
	}	

	// Request to fetch items
	requests(start, amount){
		
		let end = start+amount; 
		this.setState({end})

		axios.get(`${URL}/articles?_start=${start}&_end=${end}`)
		.then( response => {
			// console.log(response);
			this.setState({
				items: [...this.state.items, ...response.data]
			})
			
		})
	}

	loadNews(end){
		console.log('end',end);
		this.requests(end, this.props.amount)
	}

	getTeamName = id => {
		let name = ""
		this.state.teams.map( team => {
			if(team.id === id) {
				name=team.name
			}
		});
		return name;
	}

	renderNews = type=> {
		let template = null
		
		switch(type){
			case('card'):
			console.log('Card case');
				template = this.state.items.map( (item,index) => (
						<div key={index}>
							<div className={styles.newslist_item}>
								<Link to={`/articles/${item.id}`}>
										{this.getTeamName(item.id)}
									<h2>{item.title}</h2>
								</Link>
							</div>
						</div>
					))
					break;
			default:
				console.log('default');
				template = null;		
		}

		return template;
	}


	render() {
		return (
			<div>
				<h3>
					Articles
				</h3>
				{this.renderNews( this.props.type )}
				<div onClick={() => this.loadNews(this.state.end)}>
					Load More <b>articles</b>...
				</div>
				<br/>
			</div>
		)
	}
}

export default NewsList;