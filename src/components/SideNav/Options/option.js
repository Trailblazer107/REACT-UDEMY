import React from 'react';
import { Link } from 'react-router-dom';
import FontAwesome from 'react-fontawesome';
import style from './option.css';

const Options = (props) => {

	const items = [
		{
			type: style.option,
			icon: 'home',
			text: 'Home',
			link: '/'
		},

		{
			type: style.option,
			icon: 'file-text-o',
			text: 'News',
			link: '/<news></news>'
		},

		{
			type: style.option,
			icon: 'play',
			text: 'Videos',
			link: '/videos'
		},

		{
			type: style.option,
			icon: 'sign-in-alt',
			text: 'SignIn',
			link: '/sign-in'
		},

		{
			type: style.option,
			icon: 'sign-out-alt',
			text: 'SignOut',
			link: '/sign-out'
		},
	]


	const getItems = () => items.map((item, index) => (
		<div className={item.type} key={index}>
			<Link to={item.link}>
				<FontAwesome name={item.icon}/>
			{item.text}
			</Link>
		</div>
	))

	return (
		<div>
			{getItems()}    	
		</div>
	)
}

export default Options;