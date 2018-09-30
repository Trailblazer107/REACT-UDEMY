import React, { Component } from 'react';

class NewsListItemComponent extends Component {
    render() {
        return (
            <div>
            	<h3>{this.props.news_item.title}</h3>
            	<div>{this.props.news_item.feed}</div>
            </div>
        );
    }
}

export default NewsListItemComponent;
