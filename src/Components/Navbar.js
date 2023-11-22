import React from 'react'


import './Navbar.css';
import { Link } from 'react-router-dom';
const Navbar = () => {
  return (
 <>
 
 <nav class="navbar navbar-expand-lg navbar-light bg-light">
  <div class="container-fluid">
    <a class="navbar-brand" href="#">Navbar</a>
    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="navbarNav">
      <ul class="navbar-nav">
        <li class="nav-item">
          <Link class="nav-link active" aria-current="page" to={'/'}>Home</Link>
        </li>
        <li class="nav-item">
          <Link class="nav-link" to={''}>About</Link>
        </li>
        <li class="nav-item">
          <Link class="nav-link" to={'/signup'}>Signup</Link>
        </li>
        <li class="nav-item">
          <Link class="nav-link " to={'/login'} tabindex="-1" aria-disabled="true">Login</Link>
        </li>
      </ul>
    </div>
  </div>
</nav>
 
 
 
 
 
 </>
  
  )
}

export default Navbar
