import React from 'react';
import SideNav from 'react-simple-sidenav';
// import style from './sideNav.css';

//COMPONENTS
import Options from './Options/option';

const SideNavigation = (props) => {
  return (
    <div>
    	<SideNav
    		showNav={props.showNav}
    		onHideNav={props.onHideNav}
    		navStyle={{
    			background: 'black',
				padding: '10px',
				maxWidth: '160px'
			}}>

    		<Options/>
    		
    	</SideNav>
    </div>
  )
}

export default SideNavigation;