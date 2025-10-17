import React from 'react'
import { FaRegEye, FaRegEyeSlash } from 'react-icons/fa'

const Input = ({ label, type = 'text', placeholder, value, onChange }) => {
  const [showPassword, setShowPassword] = React.useState(false)

  const toggleShowPassword = () => {
    setShowPassword((s) => !s)
  }

  return (
    <div className='mb-4'>
      {label && <label className='block text-sm font-medium '>{label}</label>}
      <div className='input-box relative'>
        <input
          type={type === 'password' ? (showPassword ? 'text' : 'password') : type}
          placeholder={placeholder}
          className='w-full px-3 py-2 outline-none'
          value={value}
          onChange={onChange}
        />

        {type === 'password' && (
          <button
            type='button'
            onClick={toggleShowPassword}
            className='absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 cursor-pointer'
            aria-label={showPassword ? 'Hide password' : 'Show password'}
          >
            {showPassword ? <FaRegEyeSlash size={18} /> : <FaRegEye size={18} />}
          </button>
        )}
      </div>
    </div>
  )
}

export default Input