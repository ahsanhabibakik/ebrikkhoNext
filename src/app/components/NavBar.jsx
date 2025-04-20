import React from 'react';

const NavBar = () => {
    return (
      <div>
        <nav className='flex justify-center'>
          <ul className='flex justify-between w-50'>
            <li>Home</li>
            <li>About</li>
            <li>Contact</li>
          </ul>
        </nav>
      </div>
    );
};

export default NavBar;