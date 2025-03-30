import React from 'react'
import { GiWallet } from 'react-icons/gi'

const ItemTotalTransaction = ({ color, title, amount }) => {
    return (
        <div className='bg-white shadow-2xl p-3 rounded-lg my-1 w-full flex gap-5 items-center md:my-5'>
            <div className={`${color} size-min p-3 rounded-full`}>
                <GiWallet size={40} className='text-white hidden lg:block' />
                <GiWallet size={28} className='text-white lg:hidden' />
            </div>
            <div>
                <p className='text-slate-500 text-sm lg:text-lg'>{title}</p>
                <span className='text-xl lg:text-4xl font-bold'>{amount} ₼</span>
            </div>
        </div>
    )
}

export default ItemTotalTransaction