import React from 'react'
import Tasks from '../tasks/tasks'
import Sidebar from '../sidebar/sidebar'
import './body.css'

const Body = () => {
    return (
      <div className='grid'>
        <Sidebar/>
        <Tasks />
      </div>
    );
}

export default Body