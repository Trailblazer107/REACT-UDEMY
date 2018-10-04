import React from 'react';
import { Link } from 'react-router-dom';
import styles from './footer.css';
import { CURRENT_YEAR } from '../../config';

const Footer = props => (
		<div className={styles.footer}>
	    	<Link to="/" className={styles.logo}>
		    	<img alt="NBA_LOGO" src="images/nba_logo.png"/>
		    </Link>
		    <div className={styles.right}>
		    	@NBA {CURRENT_YEAR} All rights are reserved.
		    </div>
	    </div>
	)

export default Footer;