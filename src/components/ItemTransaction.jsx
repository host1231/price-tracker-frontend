import React from 'react'
import { LuTrendingDown, LuTrendingUp, LuTrendingUpDown } from "react-icons/lu";
import { FaTrashAlt } from "react-icons/fa";

const ItemTransaction = ({ income, title, amount, date, deleteBtn }) => {
    return (
        <div className='flex justify-between items-center p-3 my-2 rounded-lg cursor-pointer hover:bg-slate-100'>
            <div className='flex gap-3'>
                {
                    income ? (
                        <div className='bg-green-500 size-min p-3 rounded-full'>
                            <LuTrendingUp size={24} className='text-white hidden sm:block' />
                            <LuTrendingUp size={18} className='text-white sm:hidden' />
                        </div>
                    ) : (
                        <div className='bg-red-500 size-min p-3 rounded-full'>
                            <LuTrendingDown size={24} className='text-white hidden sm:block' />
                            <LuTrendingDown size={18} className='text-white sm:hidden' />
                        </div>
                    )
                }
                <div>
                    <p className='font-bold text-xs sm:text-lg'>{title}</p>
                    <span className='text-[10px] sm:text-xs text-slate-500 font-medium'>{date}</span>
                </div>
            </div>
            <div className='flex items-center gap-2 md:gap-5'>
                <span className={`text sm:text-2xl font-bold ${income ? 'text-green-600' : 'text-red-600'}`}>{income ? '+' : '-'} {amount} ₼</span>
                <button onClick={deleteBtn}>
                    <FaTrashAlt size={18} className='text-red-600 cursor-pointer hover:text-red-700 hidden md:block' />
                    <FaTrashAlt size={14} className='text-red-600 cursor-pointer hover:text-red-700 md:hidden' />
                </button>
            </div>
        </div>
    )
}

export default ItemTransaction