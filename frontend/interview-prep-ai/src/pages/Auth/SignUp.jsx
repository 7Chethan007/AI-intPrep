import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Input from '../../components/Inputs/Inputs'
import ProfilePhotoSelector from '../../components/Inputs/ProfilePhotoSelector'

const SignUp = ({ setCurrentPage }) => {
  const [profilePic, setProfilePic] = useState(null)
  const [fullname, setFullname] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState(null)
  const navigate = useNavigate()

  const handleSignUp = async (e) => {
    e.preventDefault()
    setError(null)
  }

  return (
    <div className='w-[90vw] md:w-[33vw] p-7 flex flex-col justify-center items-center'>
      <h3 className='text-lg font-semibold text-black mb-4'>
        Create Your Account
      </h3>
      <p className='text-xs text-slate-700 mt-1 mb-6 text-left'>
        Join Us today by entering your details below
      </p>

      <form onSubmit={handleSignUp} className='w-full'>

        <ProfilePhotoSelector
          image={profilePic}
          setImage={setProfilePic}
        />

        <Input
          label='Full Name'
          type='text'
          placeholder='John Doe'
          value={fullname}
          onChange={({ target }) => setFullname(target.value)}
        />
        <Input
          label='Email Address'
          type='email'
          placeholder='john.doe@example.com'
          value={email}
          onChange={({ target }) => setEmail(target.value)}
        />
        <Input
          label='Password'
          type='password'
          placeholder='Min 8 Characters'
          value={password}
          onChange={({ target }) => setPassword(target.value)}
        />

        {error && <p className='text-red-500 text-xs mt-2'>{error}</p>}
        <button type='submit' className='btn-primary'>
          Sign Up
        </button>

        <p className='text-xs text-slate-700 mt-4 text-center'>
          Already have an account?{' '}
          <button className='text-amber-600 font-medium underline cursor-pointer hover:text-amber-700 transition-smooth'
            type='button' onClick={() => setCurrentPage('login')}>
            Login
          </button>
        </p>
      </form>
    </div>
  )
}

export default SignUp