import React from 'react';
import '../css/styles.css';

const HeaderComponent = (props) => {
        return  (
            <header>
                <div 
	                className="logo"
	                >Logo </div>
	            <input 
		            type="text" 
		            onChange={props.keywords}/>
		            <div>The keywords are:- </div>
            </header>
        )
}

export default HeaderComponent; 