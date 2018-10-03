import React, { Component } from 'react';
import '../css/App.css';
import Transition from 'react-transition-group/Transition';	

class TransitionComp extends Component{

	state = {
		show: true
	}	

	changeState = () => {
		this.setState({
			show: !this.state.show ? true : false
		})
	}

    render(){
        return(
        	<div>
        		<Transition
        			in={this.state.show}
        			timeout={{
        				enter: 2000,
        				exit: 50
        			}}

        			//Which state you want to enable/disable 
        			enter={true}
        			exit={true}

        			// On entering state this method get executed
        			//node gets the element of state
        			onEnter={ (node) => {
        				console.log("onEnter()");
        			}}

        			onExit={ (node) => {
        				console.log("onExit()");
        			}}>
        			
        		{
        			state => 
        			<div className={`square square-${state}`}>
        				{`State achieved is-${state}`}
        			</div>
        		}	
        		</Transition>

        		<div
        			className="showDiv" 
        			onClick={this.changeState}>
        			Show or Hide
        		</div>    
		    </div>
        )
    }
}


export default TransitionComp;