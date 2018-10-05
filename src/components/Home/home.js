import React from 'react';
import Layout from '../../hoc/layout/layout';
import NewsSlider from '../widgets/NewsSlider/slider';
import NewsList from '../widgets/NewsList/news_list';
import VideosTemplate from '../widgets/VideosTemplate/videos';

const Home = (props) => {
  return (

  		<div>
    		<NewsSlider
    			start={3}
    			end={6}
    			type={'featured'}
    			settings={{
    				dots: false
    			}}
    		/>
    		<NewsList
    			type='card'
    			start={3}
    			amount={3}
    		/>
        <hr style={{border: "3px solid black"}}/>
        <VideosTemplate
          start='card'
          start={0}
          amount={3}
        />
    	</div>
    
  )
}

export default Home;