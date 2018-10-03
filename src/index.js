import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import Routes from './routes';

const App = (props) => {
  return (
    <div>
    	<BrowserRouter>
    		<Routes/>
    	</BrowserRouter>
    </div>
  )
}

ReactDOM.render(<App/>, document.getElementById('root'));