import React from 'react';
import PropTypes from 'prop-types';

const UserTemplate = (props) => {
  return (
    <div>
    	This is the user component
    </div>
  )
}

UserTemplate.propTypes = {
	name: PropTypes.oneOfType([
			PropTypes.string,			// In this if any one will be correct then it will throw error
			PropTypes.number,
			PropTypes.oneOf(['Francis','Steve'])
		]),
	age: PropTypes.number,
	mother: PropTypes.string.isRequired,
	hobbies: PropTypes.arrayOf(PropTypes.string),

}

export default UserTemplate;