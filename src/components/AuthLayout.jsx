import React from 'react'
import AuthImg from '../assets/images/tracker.webp'


const AuthLayout = ({children, side}) => {
  return (
    <div className={`flex justify-center h-screen w-screen ${side && 'flex-row-reverse'}`}>
        <div className='hidden lg:block w-[50%]'>
          <img src={AuthImg} className='w-lg mx-auto my-30 animate-pulse' />
        </div>
        <div className='w-full flex justify-center items-center lg:w-[50%]'>{children}</div>
    </div>
  )
}

export default AuthLayout