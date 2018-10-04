import React from 'react';
import style from './header.css';
import { Link } from 'react-router-dom';
import FontAwesome from 'react-fontawesome';

//COMPONENTS
import SideNavigation from '../SideNav/sideNav';

const Header = (props) => {

	const navBars = () => (
		<div className={style.bars}>
			<FontAwesome 
				name="bars" 
				className={style.navbar}
				onClick={props.onOpenNav}
			/>
		</div>
	)

	const logo = () => (
			<Link to="/" className={style.logo}>
		    	<img alt="NBA_LOGO" src="images/nba_logo.png"/>
		    </Link>
	)
	

  	return (
	  	<header className={style.header}>
	  		<SideNavigation {...props}/>
	  		
	  		<div className={style.headerOpt}>
	  			{navBars()}
		    	{logo()}
	    	</div>
	  	</header>
  )
}

export default Header;