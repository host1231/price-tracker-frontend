import React from 'react'
import Logo from '../assets/images/logo.svg'

const Preloader = () => {
    return (
        <div className='w-screen h-screen flex justify-center items-center'>
            <img className='animate-ping' src={Logo} />
        </div>
    )
}

export default Preloader