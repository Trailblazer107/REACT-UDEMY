import React from 'react';
import userHoc from '../components/userHoc';

const User1 = (props) => {
  return (
    <div>
    	This is the User component1
    </div>
  )
}

const User2 = (props) => {
  return (
    <div>
    	This is the User component2
    </div>
  )
}

const User3 = (props) => {
  return (
    <div>
    	This is the User component3
    </div>
  )
}

export default userHoc(User1,User2,User3, "hey there");