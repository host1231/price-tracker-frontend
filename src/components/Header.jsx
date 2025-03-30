import React, { useContext } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import AuthContext from '../context/AuthContext'
import Logo from '../assets/images/logo.svg'

const Header = () => {
  const {user, logout} = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  }

  return (
    <header className='bg-white shadow-2xl p-3 rounded-lg'>
        <div className='flex justify-between items-center'>
          <Link to='/dashboard'>
            {/* <h3 className='text sm:text-2xl font-extrabold'>Pul izləmə</h3> */}
            <img  src={Logo} alt='Logo' />
          </Link>
          <div className='flex gap-3 items-center'>
            <p className='font-semibold text-sm sm:text-lg'>Salam, {user?.name}</p>
            <button onClick={handleLogout} className='bg-red-600 text-white text-xs uppercase py-1 px-2 rounded cursor-pointer font-medium transition duration-300 hover:bg-red-800 sm:py-2 sm:px-4 sm:text-sm'>çıxış</button>
          </div>
        </div>
      </header>
  )
}

export default Header