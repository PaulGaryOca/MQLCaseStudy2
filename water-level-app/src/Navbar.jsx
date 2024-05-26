import React from 'react';
import { Link } from 'react-router-dom';
const NavBar = () => {
  return (
    <nav>
      <ul style={{ listStyleType: 'none', padding: 0, display: 'flex', gap: '10px', justifyContent: 'flex-end',marginRight:'50px'   ,marginTop:'50px'    }}>
      <li><Link to="/">Home</Link></li>
     //useless
      </ul>
    </nav>
  );
};

export default NavBar;
