import React from 'react'
import './navbar.css'
import logo from '../images/oases.png'

const Navbar = () => {
  return (
      <div className='navbar'>
          <h1 className='nav-brand'>Todo List</h1>
          <img src={logo} alt="Logo of oases" className='logo'/>
    </div>
  )
}

export default Navbar