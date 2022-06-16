import React from 'react'
import './navbar.css';
import { Link } from 'react-router-dom';
import { useStoreState } from 'easy-peasy';

import Logo from '../Logo/Logo';

// Icons
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons'

function Navbar() {
  const { user } = useStoreState((store) => store.userStore)
  return (
    <div className='navbar'>
      <div className="navbar-container">
        <Logo />
        {
          user
            ?
              <>
                <Link to='/'>Home</Link>
                <Link to='/account'>Account</Link>
                <Link to='/setting'>Setting</Link>
              </>
            :
              <>
                <div className="link mobile">
                  <FontAwesomeIcon icon={faBars} size='xl' />
                </div>
                <div className="link desktop">
                  <Link to=''>Login</Link>
                  <Link to=''>Register</Link>
                </div>
              </>
        }
      </div>
    </div>
  )
}

export default Navbar