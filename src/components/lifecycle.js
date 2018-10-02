import React, { Component } from 'react';


class LifeCyle extends Component {

	state = {
		title: 'Hey there'
	}

	// 1 componentWillMount()
	componentWillMount(){
		console.log(" 1 ComponentWillMount called");
	}

	// 3 componentDidMount()
	componentDidMount(){
		console.log(" 3 ComponentDidMount called");
	}
	
	//4 componentWillUpdate()
	componentWillUpdate(){
		console.log("4 componentWillUpdate");
	}

	//5 componentDidUpdate()
	componentDidUpdate(){
		console.log("5 componentDidUpdate");
	}	

	shouldComponentUpdate(nextProps, nextState){
		// console.log('nextProps',nextProps);
		// console.log('nextState',nextState);
		console.log('This state ',this.state.title);
		console.log('Next State',nextState.title);
		return true
	}

	componentWillReceiveProps(){
		console.log('--Before recive props',);
	}

	componentWillUnmount(){
		console.log('6 componentWillUnmount called');
	}
	render(){

	// 2 Component Render
		console.log(' 2 Rendering the component');
		return(
			<div>
				<h3>his is the LifeCyle</h3>
				<div onClick={
					() => this.setState({
						title: 'something else'			
					})
				}>
					Hello
				</div>
			</div>

			)
	}
}


export default LifeCyle;
