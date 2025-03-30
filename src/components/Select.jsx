import React from 'react'

const Select = ({ label, placeholder, value, onChange }) => {
    return (
        <div>
            <label className='text-sm font-medium'>
                {label}
                <span className='text-red-500 ml-1'>*</span>
            </label>
            <select
                className='w-full bg-transparent outline-none input-box px-5'
                value={value}
                onChange={(e) => onChange(e)}
            >
                <option value=''>{placeholder}</option>
                <option value='income'>Mədaxil</option>
                <option value='expense'>Xərc</option>
            </select>
        </div>
    )
}

export default Select