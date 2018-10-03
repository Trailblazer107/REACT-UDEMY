import React, { Component } from 'react';
import { TransitionGroup, CSSTransition } from 'react-transition-group';
import '../css/App.css';

class Slide extends Component{
    state = {
        items:[]
    }
    
    addElements () {
        return this.state.items.map((item,i) => (
            <CSSTransition
                classNames="item"
                timeout={{
                        enter: 5000,
                        //You can use this to exit and remove div, it only removes after given limit
                        exit: 1000   
                    }}
                key={i}>
                <div className="item" key={i}>{item}</div>
            </CSSTransition>
        ));
    }

    generateNumber(){
        let items = this.state.items;
       items.push(Math.floor(Math.random() * 100) + 1)
        this.setState({
            items
        })
    }

    removeNumber(){
        let newArray = this.state.items.slice(0,-1);
        this.setState({
            items:newArray
        })
    }

    render(){
        return(
            <div>
                <TransitionGroup 
                    component="div"
                    className="list">
                    {this.addElements()}
                </TransitionGroup>

                <div className="btns">
                    <div className="btn-add" onClick={()=> this.generateNumber()}>Add Elements</div>
                    <div className="btn-remove" onClick={()=> this.removeNumber()}>Remove Elements</div>
                </div>
            </div>
        )
    }



}


export default Slide;