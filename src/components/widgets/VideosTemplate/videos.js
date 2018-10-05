import React, { Component } from 'react';
import axios from 'axios';

import { URL } from '../../../config';

class VideosTemplate extends Component {

	constructor(props){
		super(props);
		this.state = {
			videos:[],
			end: 0
		}
	}

	UNSAFE_componentWillMount(){
		this.requests(this.props.start, this.props.amount)
		
	}

	// Request to fetch Vidoes
	requests(start, amount){
		
		let end = start+amount; 
		this.setState({end})

		axios.get(`${URL}/videos?_start=${start}&_end=${end}`)
		.then(response => {
			this.setState({
				videos: [...this.state.videos,...response.data]
			})
			// console.log('Videos',response.data);

		})
	}

	loadVideos(end) {
		this.requests(end, this.props.amount)
	}


	renderVideos = () => (
			this.state.videos.map( (video, index) => (
				<div key={index}>
					<div>
						{video.title}
						<hr style={{
							'border': '1px solid grey'
						}}/>
					</div>
				</div>
			)
		)
	)

	render() {
		return (
			<div>
				<h3>
					Videos
				</h3>
				{this.renderVideos()}
				<div onClick={() => this.loadVideos(this.state.end)}>
					Load More <b>videos...</b> 
				</div>
			</div>
		);
	}
}

export default VideosTemplate;
