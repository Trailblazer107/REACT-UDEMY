import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import JSON from './db.json';
//COMPONENTS
import HeaderComponent from './components/header';
import NewsList from './components/news_list';

class App extends Component {

	state = {
		news: JSON,
		filtered: []
	}
 	
 	getKeyword = (event) => {
		 let keywords = event.target.value;
		 let filtered = this.state.news.filter(item => {
			return item.title.indexOf(keywords) > -1 
		 })

		 this.setState({ filtered });
		 
 	}

 	render(){
 		let newsWhole = this.state.news;
 		let filteredNews = this.state.filtered;

    	return (
        	<div>
            	<HeaderComponent keywords={this.getKeyword}/>
            	<NewsList news = { filteredNews.length === 0 ? newsWhole : filteredNews }/>
        	</div>
    	)
 	}
}
	

ReactDOM.render(<App/>, document.querySelector('#root'))