import React from 'react';
import Layout from '../../hoc/layout/layout';
import NewsSlider from '../widgets/NewsSlider/slider';

const Home = (props) => {
  return (

  	<Layout>
  		<div>
    		<NewsSlider/>
    	</div>
  	</Layout>
    
  )
}

export default Home;