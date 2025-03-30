import React, { useState } from 'react'
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";

const Input = ({type, value, onChange, placeholder, label}) => {
  const [showPassword, setShowPassword] = useState(false);

  const toggleShowPassword = () => setShowPassword(!showPassword);

  return (
    <div>
        <label className='text-sm font-medium'>
          {label}
          <span className='text-red-500 ml-1'>*</span>
        </label>
        <div className='input-box'>
          <input 
            className='w-full bg-transparent outline-none ' 
            placeholder={placeholder}
            type={type === 'password' ? showPassword ? 'text' : 'password' : type} 
            value={value}
            onChange={(e) => onChange(e)} 
          />
          {
            type === 'password' && (
              <>
                {
                  showPassword ? (
                    <FaRegEye 
                      size={22}
                      className='text-slate-900 cursor-pointer'
                      onClick={() => toggleShowPassword()}
                    />
                  ) : (
                    <FaRegEyeSlash 
                      size={22}
                      className='text-gray-400 cursor-pointer'
                      onClick={() => toggleShowPassword()}
                    />
                  )
                }
               
              </>
            )
          }
        </div>
    </div>
  )
}

export default Input