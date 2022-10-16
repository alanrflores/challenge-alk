import React from 'react'
import './pages/styles/navbar.css'
const Navbar = () => {
  const logoAlkemy = 'https://assets.alkemy.org/assets/alkemy-logo.svg'
  return (
    <div className='containerNavbar'>
      <img src={logoAlkemy} alt="logo-alkemy" />
    </div>
  )
}

export default Navbar