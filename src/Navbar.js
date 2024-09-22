import React from 'react';
import logo from './logo.jpg'; // Adjust the path as necessary

function Navbar() {
  return (
    <nav className="flex justify-between bg-slate-700 text-white py-2">
      <div className='logo'>
        <span className='font-bold text-xl mx-9'>iTasks</span>
      </div>
      <img src={logo} alt="Logo" className="h-10 mx-9 rounded-md" />
    </nav>
  );
}

export default Navbar;
